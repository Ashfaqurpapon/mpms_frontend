export class LoggedUserData {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin" | "manager" | string;
  phone: string;
  address: string;
  needsPasswordChange: boolean;
  isDeleted: boolean;
  status: "in-progress" | "active" | "suspended" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.phone = data.phone;
    this.address = data.address;
    this.needsPasswordChange = data.needsPasswordChange;
    this.isDeleted = data.isDeleted;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.__v = data.__v;
  }
}

export class LoggedTokenAnsUser {
  token: string;
  user: LoggedUserData;

  constructor(token: string, userData: any) {
    this.token = token;
    this.user = new LoggedUserData(userData);
  }
}
