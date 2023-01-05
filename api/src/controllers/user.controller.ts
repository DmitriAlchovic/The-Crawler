import { User } from '../models/user.model';

interface UserInput {
    email: string;
    password: string;
    userName: string;
    phoneNumber: string;
    discountId: number;
}

export const findByEmailController = async (email: string) => {
  return await User.findOne({
    where: {email: email},
    raw: true, attributes: ['userId', 'email', 'password'] });
};

export const createUserController = async ({email, password, userName, phoneNumber, discountId}: UserInput) => {
  return await User.create({
    email: email,
    password: password,
    fullName: userName,
    phoneNumber: phoneNumber,
    discountId: discountId,
  });
};

export const findByIdController = async (userId: number) => {
  return await User.findOne({
    where: {userId: userId},
    raw: true, attributes: ['email', 'fullName', 'avatar'] });
};

export default { findByEmailController, findByIdController };
