"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { PurchaseOrg } from "@aksar/api/validators";

import { useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { purchaseOrgSchema } from "@aksar/api/validators";
import { cn } from "@aksar/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@aksar/ui/avatar";
import { Button } from "@aksar/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@aksar/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@aksar/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@aksar/ui/form";
import { Input } from "@aksar/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@aksar/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@aksar/ui/select";
import { useToast } from "@aksar/ui/use-toast";

import { useZodForm } from "~/lib/zod-form";
import { api } from "~/trpc/client";

export function WorkspaceSwitcher() {
  const router = useRouter();

  const [switcherOpen, setSwitcherOpen] = React.useState(false);
  const [newOrgDialogOpen, setNewOrgDialogOpen] = React.useState(false);

  const orgs = useOrganizationList();
  const org = useOrganization();

  const { user, isSignedIn, isLoaded } = useUser();
  if (isLoaded && !isSignedIn) throw new Error("How did you get here???");

  const activeOrg = org.organization ?? user;
  if (!orgs.isLoaded || !org.isLoaded || !activeOrg) {
    // Skeleton loader
    return (
      <Button
        variant="ghost"
        size="sm"
        role="combobox"
        aria-expanded={switcherOpen}
        aria-label="Select a workspace"
        className="w-52 justify-between opacity-50"
      >
        <Avatar className="mr-2 h-5 w-5">
          <AvatarFallback>Ac</AvatarFallback>
        </Avatar>
        Select a workspace
        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0" />
      </Button>
    );
  }

  const normalizedObject = {
    id: activeOrg.id,
    name: "name" in activeOrg ? activeOrg.name : activeOrg.fullName,
    image: activeOrg.imageUrl,
  };

  return (
    <Dialog open={newOrgDialogOpen} onOpenChange={setNewOrgDialogOpen}>
      <Popover open={switcherOpen} onOpenChange={setSwitcherOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            aria-expanded={switcherOpen}
            aria-label="Select a workspace"
            className="w-52 justify-between"
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={normalizedObject?.image ?? ""} />
              <AvatarFallback>
                {normalizedObject.name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            {normalizedObject.name}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search workspace..." />
              <CommandGroup heading="Personal account">
                <CommandItem
                  onSelect={async () => {
                    if (!user?.id) return;
                    normalizedObject.id = user.id ?? "";

                    await orgs.setActive?.({ organization: null });
                    setSwitcherOpen(false);
                    router.push(`/${user.id}`);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName ?? ""}
                    />
                    <AvatarFallback>
                      {`${user?.firstName?.[0]}${user?.lastName?.[0]}` ?? "JD"}
                    </AvatarFallback>
                  </Avatar>
                  {user?.fullName}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      org.organization === null ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Organizations">
                {orgs.organizationList?.map(({ organization: org }) => (
                  <CommandItem
                    key={org.name}
                    onSelect={async () => {
                      await orgs.setActive({ organization: org });
                      setSwitcherOpen(false);
                      router.push(`/${org.id}`);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={org.imageUrl ?? "/images/placeholder.png"}
                        alt={org.name}
                      />
                      <AvatarFallback>
                        {org.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {org.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        normalizedObject?.id === org.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setSwitcherOpen(false);
                      setNewOrgDialogOpen(true);
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Organization
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <React.Suspense>
        <NewOrganizationDialog closeDialog={() => setNewOrgDialogOpen(false)} />
      </React.Suspense>
    </Dialog>
  );
}

function NewOrganizationDialog(props: { closeDialog: () => void }) {
  const plans = React.use(api.stripe.plans.query());

  const form = useZodForm({ schema: purchaseOrgSchema });

  const toaster = useToast();

  async function handleCreateOrg(data: PurchaseOrg) {
    const response = await api.stripe.purchaseOrg
      .mutate(data)
      .catch(() => ({ success: false as const }));

    if (response.success) window.location.href = response.url;
    else
      toaster.toast({
        title: "Error",
        description:
          "There was an error setting up your organization. Please try again.",
        variant: "destructive",
      });
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateOrg)}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Create organization</DialogTitle>
            <DialogDescription>
              Add a new organization to manage products and customers.
            </DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="orgName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="aksar Inc." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="planId"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Subscription plan *</FormLabel>
                  <Link
                    href="/pricing"
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    What&apos;s included in each plan?
                  </Link>
                </div>
                <Select {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        <span className="font-medium">{plan.name}</span> -{" "}
                        <span className="text-muted-foreground">
                          ${plan.amount / 100} per month
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => props.closeDialog()}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
