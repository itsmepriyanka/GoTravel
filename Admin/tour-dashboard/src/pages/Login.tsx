import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const LoginPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const handleLoginSubmit = () => {
        const email = emailRef.current?.value;
        const password = passRef.current?.value;
        console.log("data", { email, password });
    };
    return (
        <section className='flex justify-center items-center h-screen'>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
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
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input ref={passRef} id="password" type="password" required />
                        </div>
                        <Button onClick={handleLoginSubmit} type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Didn't have an account?{' '}
                        <Link to={'/Auth/Register'} className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default LoginPage;