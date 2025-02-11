'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '@/lib/auth/mutations';
import type { LoginInput, SignUpInput, AuthResponse } from '@/lib/auth/types';
import { loginSchema, signUpSchema } from '@/lib/auth/schemas';
import type { LoginFormData, SignUpFormData } from '@/lib/auth/schemas';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [login] = useMutation<{ login: AuthResponse }, { loginInput: LoginInput }>(LOGIN_MUTATION);
  const [signUp] = useMutation<{ signUp: AuthResponse }, { signUpInput: SignUpInput }>(SIGNUP_MUTATION);

  const form = useForm<LoginFormData | SignUpFormData>({
    resolver: zodResolver(isLogin ? loginSchema : signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(isLogin ? {} : { name: '' }),
    },
  });

  const onSubmit = async (data: LoginFormData | SignUpFormData) => {
    try {
      if (isLogin) {
        const { data: loginData } = await login({
          variables: { loginInput: data as LoginInput },
        });
        if (loginData?.login.token) {
          localStorage.setItem('token', loginData.login.token);
          router.push('/profile');
        }
      } else {
        const { data: signUpData } = await signUp({
          variables: { signUpInput: data as SignUpInput },
        });
        if (signUpData?.signUp.token) {
          localStorage.setItem('token', signUpData.signUp.token);
          router.push('/profile');
        }
      }
    } catch (err) {
      form.setError('root', {
        message: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Sign in' : 'Create account'}</CardTitle>
          <CardDescription>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Create a new account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <div className="text-red-500 text-sm text-center">
                  {form.formState.errors.root.message}
                </div>
              )}
              <Button type="submit" className="w-full">
                {isLogin ? 'Sign in' : 'Create account'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={() => {
              setIsLogin(!isLogin);
              form.reset();
            }}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
