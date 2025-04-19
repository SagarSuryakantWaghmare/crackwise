// typescript
// filepath: d:\crackwise\components\AuthForm.tsx
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { FormLabel } from "./ui/form";
import { useRouter } from "next/navigation";
import {createUserWithEmailAndPassword} from '@firebase/auth';
import { signUp } from "@/lib/actions/auth.action";
import { auth } from "@/firebase/client";
const formSchema = z.object({
    username: z.string().min(2).max(50),
});

type FormType = 'sign-in' | 'sign-up';

const authFormSchema=(type:FormType)=>{
    return z.object({
        name:type==='sign-up'?z.string().min(2).max(50):z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8).max(50),
})}
const AuthForm = ({type}:{type:FormType}) => {
    const formSchema=authFormSchema(type);
    const router=useRouter();

    // Define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password:""
        },
    });
    //define submit handler
    async function  onSubmit (values: z.infer<typeof formSchema>) {
        try {
            if(type==='sign-up'){
                const {name,email,password,}=values;
                const userCredentials=await createUserWithEmailAndPassword(auth,email,password);
                const result=await signUp({
                    uid:userCredentials.user.uid,
                    name:name!,
                    email,
                    password,
                })
                if(!result?.success){
                  toast.error(result?.message);
                  return;  
                }

                toast.success("Account created successfully.Please Sign in.")
                router.push('/sign-in');
            }
            else{
                toast.success('Sign in successfully')
                router.push('/');
                console.log("Sign in", values);
            }
            
        } catch (error) {
           console.log(error);
           toast.error("Something went wrong, please try again later") 
        }
    }
    const isSignIn=type==='sign-in';
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center ">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">CrashWise</h2>
                </div>
                <h2>Pratice job interview with AI</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                    
                        {!isSignIn&&<FormField control={form.control} name="name" label="Name" placeholder="Enter your name"/>}
                        <FormField control={form.control} name="email" label="Email" placeholder="Enter your email" type="email" />
                        <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password"/>
                        <Button className="btn" type="submit">{isSignIn?'Sign In':'Create an Account'}</Button>
                    </form>
                    <p className="flex items-center justify-center   ">
                        {isSignIn ? 'No account yet?' : 'Have an account already?'}
                       
                            <Link href={!isSignIn ? '/sign-in' : 'sign-up'} className="font-bold text-user-primary ml-1">
                                {!isSignIn ? 'Sign In' : 'Sign up'}
                            </Link>
                       
                    </p>
                </Form>
            </div>
        </div>
    )
}

export default AuthForm