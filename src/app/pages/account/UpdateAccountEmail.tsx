// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { updateEmailSchema } from "@/app/schemas/user.schemas"; // Define a schema for email update validation
// import { Button, Input } from "@/components/ui";
// import { useToast } from "@/hooks/use-toast";
// import { useUpdateEmailMutation } from "@/app/services/mutations/user.mutations"; // Implement API call
// import { UpdateEmailModel } from "@/app/models/user.models";

const UpdateAccountEmail = () => {
  // const { toast } = useToast();
  // const updateMutation = useUpdateEmailMutation();

  // const form = useForm<UpdateEmailModel>({
  //   resolver: zodResolver(updateEmailSchema),
  // });

  // const onSubmit = (data: UpdateEmailModel) => {
  //   updateMutation
  //     .mutateAsync({ data })
  //     .then(() => {
  //       toast({ title: "Email updated successfully" });
  //     })
  //     .catch((err) => {
  //       toast({ variant: "destructive", description: err });
  //     });
  // };

  return (
    <div>
      <h2>Change Email</h2>
      {/* <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label>New Email</label>
          <Input {...form.register("newEmail")} type="email" />
        </div>
        <div>
          <label>Password</label>
          <Input {...form.register("password")} type="password" />
        </div>
        <Button type="submit">Save Changes</Button>
      </form> */}
    </div>
  );
};

export default UpdateAccountEmail;
