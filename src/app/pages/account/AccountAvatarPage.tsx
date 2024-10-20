import { useState, useEffect } from "react";
import { useUpdateProfileMutation } from "@/app/services/mutations/user.mutations";
import { useProfileStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AccountAvatarPage() {
  const { profile, setProfile } = useProfileStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(profile?.avatar);
  const updateProfileMutation = useUpdateProfileMutation();

  useEffect(() => {
    setImageUrl(profile?.avatar);
  }, [profile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const data = { avatar: selectedFile };
    updateProfileMutation.mutate(
      { data },
      {
        onSuccess: (updatedProfile) => {
          setProfile(updatedProfile);
          setImageUrl(updatedProfile.avatar);
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <img
          src={imageUrl || "/default-avatar.png"}
          alt="Current Avatar"
          className="w-64 h-64 rounded object-cover"
        />
      </div>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!selectedFile}>
        Upload Avatar
      </Button>
    </div>
  );
}
