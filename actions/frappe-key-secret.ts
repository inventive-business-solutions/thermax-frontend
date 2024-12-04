"use server";

import { auth } from "@/auth";

export const getFrappeToken = async () => {
  const session = await auth();
  if (session && session.userInfo) {
    return `token ${session.userInfo.api_key}:${session.userInfo.api_secret}`;
  }
  return "";
};

export const getFrappeAdminToken = async () => {
  return `token ${process.env.FRAPPE_ADMIN_AUTH_KEY}:${process.env.FRAPPE_ADMIN_AUTH_SECRET}`;
};

export const getFrappeBaseUrl = async () => {
  return process.env.FRAPPE_BASE_URL;
};

export const getAuthSecretToken = async () => {
  return process.env.AUTH_SECRET;
};
