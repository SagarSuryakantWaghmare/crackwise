"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signUp } from "@/lib/actions/auth.action";
import { auth } from "@/firebase/client";

// Types
type FormType = "sign-in" | "sign-up";

// Schema generator based on form type
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const router = useRouter();
  const isSignIn = type === "sign-in";

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message || "Sign-up failed.");
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
        console.log("Sign up", values);

      } else {
        const { email, password } = values;
        console.log("Trying to sign in with:", email, password);
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          toast.success("Signed in successfully.");
          router.push("/");
          console.log("Sign in successful", userCredential);
        } catch (error: any) {
          console.error("Sign-in error:", error.code, error.message);
          let message = "Failed to sign in. Please check your credentials.";
          if (error.code === "auth/user-not-found") {
            message = "User not found. Please sign up.";
          } else if (error.code === "auth/wrong-password") {
            message = "Incorrect password.";
          }
          toast.error(message);
        }
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong, please try again later.");
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">CrashWise</h2>
        </div>
        <h2>Practice job interview with AI</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>

          <p className="flex items-center justify-center">
            {isSignIn ? "No account yet?" : "Have an account already?"}
            <Link
              href={!isSignIn ? "/sign-in" : "/sign-up"}
              className="font-bold text-user-primary ml-1"
            >
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
