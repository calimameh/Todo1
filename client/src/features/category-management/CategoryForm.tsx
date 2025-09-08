import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, Category } from "@/lib/validators";
import { useCreateCategory } from "@/api/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CategoryFormProps = {
  onClose: () => void;
};

export const CategoryForm = ({ onClose }: CategoryFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<Category, "id">>({
    resolver: zodResolver(createCategorySchema),
  });

  const createCategory = useCreateCategory();

  const onSubmit = (data: Omit<Category, "id">) => {
    createCategory.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("categoryName")} placeholder="Category Name" />
      {errors.categoryName && <span>{errors.categoryName.message}</span>}

      <Input {...register("categoryDescription")} placeholder="Category Description" />
      {errors.categoryDescription && <span>{errors.categoryDescription.message}</span>}

      <Button type="submit">Create Category</Button>
    </form>
  );
};