import bcrypt
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from jose import jwt
from datetime import datetime, timedelta

from app.database import get_db
from app.config import settings
from app.models.user import User, UserProfile
from app.schemas.careerbridge import AuthRegisterRequest, AuthLoginRequest, AuthTokenResponse

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        pw_bytes = plain_password.encode('utf-8')[:72]
        hash_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(pw_bytes, hash_bytes)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    pw_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pw_bytes, salt).decode('utf-8')

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)
    return encoded_jwt

@router.post("/register", response_model=AuthTokenResponse)
async def register(req: AuthRegisterRequest, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.email == req.email))
    if res.scalars().first():
        raise HTTPException(status_code=400, detail="Email is already registered.")

    hashed_pw = get_password_hash(req.password)
    new_user = User(
        email=req.email,
        hashed_password=hashed_pw,
        full_name=req.full_name,
        role=req.role
    )
    db.add(new_user)
    await db.flush()

    new_profile = UserProfile(
        user_id=new_user.id,
        name=req.full_name,
        email=req.email
    )
    db.add(new_profile)
    await db.commit()

    token = create_access_token({"sub": new_user.id, "email": new_user.email, "role": new_user.role})

    return AuthTokenResponse(
        access_token=token,
        user_id=new_user.id,
        email=new_user.email,
        full_name=new_user.full_name,
        role=new_user.role
    )

@router.post("/login", response_model=AuthTokenResponse)
async def login(req: AuthLoginRequest, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.email == req.email))
    user = res.scalars().first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})

    return AuthTokenResponse(
        access_token=token,
        user_id=user.id,
        email=user.email,
        full_name=user.full_name,
        role=user.role
    )
