"use server";

import { auth } from "@/auth";
import {
  DELETE_USER_EMAIL_API,
  NEXT_AUTH_USER_API,
  THERMAX_USER_API,
  USER_API,
} from "@/configs/api-endpoints";
import { BTG } from "@/configs/constants";
import { createData, deleteData, getData } from "./crud-actions";

export const getUserRoles = async () => {
  const session = await auth();
  const roles = session?.userInfo?.roles;
  return roles.map((role: any) => role.role);
};

export const getUserInfo = async () => {
  const session = await auth();
  return session?.userInfo;
};

export const getSuperuserEmail = async (division_name: string) => {
  try {
    const superuser = await getData(
      `${THERMAX_USER_API}?filters=[["is_superuser","=","1"], ["division","=","${division_name}"]]`
    );
    return superuser[0].name;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (email: string) => {
  try {
    const thermaxUser = await getData(`${THERMAX_USER_API}/${email}`);
    const division_name = thermaxUser?.division;
    const is_superuser = thermaxUser?.is_superuser;
    let superuserEmail = "";
    if (is_superuser) {
      superuserEmail = await getSuperuserEmail(BTG);
    } else {
      superuserEmail = await getSuperuserEmail(division_name);
    }
    const superuser = await getData(`${USER_API}/${superuserEmail}`);
    await deleteData(`${THERMAX_USER_API}/${email}`, false);
    await deleteData(`${NEXT_AUTH_USER_API}/${email}`, false);
    await createData(`${DELETE_USER_EMAIL_API}`, false, {
      recipient_email: thermaxUser?.email,
      cc_email: superuserEmail,
      subject: "User Removal Notification - EnIMAX",
      division_name,
      is_superuser: thermaxUser?.is_superuser,
      sent_by: thermaxUser?.is_superuser
        ? "Team BTG"
        : `${superuser?.first_name} ${superuser?.last_name}`,
    });
    await deleteData(`${USER_API}/${email}`, false);
  } catch (error) {
    throw error;
  }
};
