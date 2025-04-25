// components/LogoutButton.tsx
"use client";

import { Button } from "@/components/ui/button"; 
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client"; // make sure the path is correct

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="btn-secondary max-sm:w-full"
      variant="outline"
      size="lg"
      style={{ width: "100%" }}
    >
      Log Out
    </Button>
  );
}
