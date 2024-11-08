import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const RegisterPage = () => {

    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            console.log("Login successful");
            navigate('/dashboard/Home');

        },
    });


    const handleRegisterSubmit = () => {
        const email = emailRef.current?.value;
        const password = passRef.current?.value;
        const name = nameRef.current?.value;
        console.log("data", { email, password });

        if (!name || !email || !password) {
            return alert("Please enter name, email and password ");
        }
        mutation.mutate({ name, email, password });

    };
    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>Enter your information to create an account <br />
                        {mutation.isError && (
                            <span className='text-red-500 text-sm'>{'Something went wrong'}</span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input ref={nameRef} id="name" placeholder="Max" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                ref={emailRef}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input ref={passRef} id="password" type="password" />
                        </div>

                        <Button onClick={handleRegisterSubmit} variant="default" className="w-full" >
                            {mutation.isPending && <Loader className='animate-spin' />}
                            <span className='ml-2'>Create an account</span>

                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link to={'/Auth/login'} className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default RegisterPage;