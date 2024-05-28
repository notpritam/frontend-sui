import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { Link } from "lucide-react";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

function Header() {
  const account = useCurrentAccount();

  return (
    <div className="flex justify-between py-4 px-8 border-b-[1px] ">
      <span>Name</span>
      {account ? <ConnectedAccount /> : <ConnectButton />}
    </div>
  );
}

export default Header;

function ConnectedAccount() {
  const account = useCurrentAccount();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  if (!account) {
    return null;
  }
  return (
    <div className="flex gap-8">
      <div className="max-w-[300px] inline-block min-w-0">
        <span className="truncate block">
          Connected to := {account.address}
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Account Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
