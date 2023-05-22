"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { useSignIn, useSignUp } from "@clerk/nextjs/app-beta/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@aksar/ui/button";
import { Icons } from "@aksar/ui/icons";
import { Input } from "@aksar/ui/input";
import { useToast } from "@aksar/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/form";

const emailSchema = z.object({
  email: z.string().email(),
});

type EmailValues = z.infer<typeof emailSchema>;

// This can come from your database or API.
const defaultValues: Partial<EmailValues> = {
  // email: "Your email",
};

export function EmailSignIn() {
  //const [isLoading, setIsLoading] = React.useState(false);

  const { signIn, isLoaded: signInLoaded, setSession } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues,
  });

  async function onSubmit(data: EmailValues) {
    if (!signInLoaded || !data.email) return null;
    // the catch here prints out the error.
    // if the user doesn't exist we will return a 422 in the network response.
    // so push that to the sign up.
    await signIn
      .create({
        strategy: "email_link",
        identifier: data.email,
        redirectUrl: `${window.location.origin}/`,
      })
      .catch((error) => {
        console.log("sign-in error", JSON.stringify(error));
      });

    const firstFactor = signIn.supportedFirstFactors.find(
      (f) => f.strategy === "email_link",
    );

    if (firstFactor) {
      // this error needs type fixing, because typescript is dumb.
      const { emailAddressId } = firstFactor as { emailAddressId: string };
      const { startMagicLinkFlow, cancelMagicLinkFlow } =
        signIn.createMagicLinkFlow();
      toast({
        title: "Email Sent",
        description: "Check your inbox for a verification email.",
      });
      const response = await startMagicLinkFlow({
        emailAddressId: emailAddressId,
        redirectUrl: `${window.location.origin}/`,
      })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong, please try again.",
          });
        })
        .then((res) => res);

      const verification = response?.firstFactorVerification;

      if (verification?.status === "expired") {
        toast({
          variant: "destructive",
          title: "Link Expired",
          description: "Link expired, please try again.",
        });
      }

      cancelMagicLinkFlow();

      if (response?.status === "complete") {
        await setSession(
          response.createdSessionId,
          () => void router.push(`/dashboard`),
        );
      }
    } else {
      if (!signUpLoaded) return null;
      await signUp.create({
        emailAddress: data.email,
      });
      const { startMagicLinkFlow } = signUp.createMagicLinkFlow();

      toast({
        title: "Email Sent",
        description: "Check your inbox for a verification email.",
      });
      const response = await startMagicLinkFlow({
        redirectUrl: `${window.location.origin}/`,
      })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong, please try again.",
          });
        })
        .then((res) => res);

      if (response?.status === "complete") {
        await setSession(signUp.createdSessionId, () => router.push("/"));
        return;
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/*<FormLabel></FormLabel>*/}
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              {/*<FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>*/}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isLoading}>
          {form.formState.isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In with Email
        </Button>
      </form>
    </Form>
    /*<div className="grid gap-2">
      <div className="grid gap-1">
        <Input
          name="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="bg-background"
        />
      </div>
      <Button disabled={isLoading} onClick={() => signInWithLink()}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign In with Email
  </Button>
  </div>*/
  );
}
