export interface IFormUser {
    user?: Array<FormUserDetailModel>;
  }
  
  export interface FormUserDetailModel {
      email?: string,
      password?: string,
      manager: ManagerModel
  }
  
  export interface ManagerModel {
   admin:boolean;
  }