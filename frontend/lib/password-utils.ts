import bcrypt from 'bcryptjs';

// 비밀번호 해싱
export function saltAndHashPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
}

// DB에 있는 비밀번호와 입력한 비밀번호가 일치하는지 확인
export function comparePassword(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
