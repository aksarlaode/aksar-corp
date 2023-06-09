import { auth } from "@clerk/nextjs";

import { Button } from "@aksar/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@aksar/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@aksar/ui/dialog";
import * as Icons from "@aksar/ui/icons";

import { DashboardShell } from "../../_components/dashboard-shell";

export default function DangerZonePage() {
  return (
    <DashboardShell title="Danger Zone" description="Do dangerous stuff here">
      <div className="space-y-6">
        <DeleteWorkspace />
      </div>
    </DashboardShell>
  );
}

function DeleteWorkspace() {
  const title = "Delete workspace";
  const description = "This will delete the workspace and all of its data.";

  const { orgId } = auth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex items-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild disabled={!orgId}>
            <Button variant="destructive">{title}</Button>
          </DialogTrigger>
          {!orgId && (
            <span className="mr-auto px-2 text-sm text-muted-foreground">
              You can not delete your personal workspace
            </span>
          )}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center font-bold text-destructive">
              <Icons.Warning className="mr-2 h-6 w-6" />
              <p>This action can not be reverted</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button variant="destructive">
                {`I'm sure. Delete this workspace`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
