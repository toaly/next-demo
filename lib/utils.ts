import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}


type BasePrams = {
  code?: number,
  msg?: string,
  data?: any
}

// **** 模型定义类 ****
interface BaseParams<T> {
  code?: number;
  data?: T;
  msg?: string;
}

class BaseModel<T> {
  code?: number;
  data?: T;
  msg?: string;

  constructor({ code, data, msg }: BaseParams<T>) {
    this.code = code;
    if (data) {
      this.data = data;
    }
    if (msg) {
      this.msg = msg;
    }
  }
}

// 成功的模型
class SuccessModel<T> extends BaseModel<T> {
  constructor({ msg, data, code = 200 }: { msg?: string; data: T; code?: number }) {
    super({ msg, data, code });
  }
}

// 失败的模型
class ErrorModel<T> extends BaseModel<T> {
  constructor({ msg, code = 500 }: { msg: string; code?: number }) {
    super({ code, msg });
  }
}

// 成功的模型
class ResModel<T> extends BaseModel<T> {
  constructor(params: BaseParams<T>) {
    super(params);
  }
  static success<T>(data: T, msg = 'success', code = 200): SuccessModel<T> {
    return new SuccessModel({ data, code, msg });
  }
  static error(msg: string, code?: number) {
    return new ErrorModel({ msg, code });
  }
}

export {
  ResModel,
  cn
}