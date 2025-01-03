import SignIn from "@/components/SignIn";

export default function Web() {
  const secret = process.env.AUTH_SECRET;
  return <SignIn authSecret={secret as string} />;
}
