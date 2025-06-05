import Divider from "@/backend/components/divider/Divider";
import Heading from "@/backend/components/heading/Heading";
import { Loader2 } from "lucide-react";
import React from "react";

type FormProductAddHeaderProps = {
  title: string;
  isSubmitting?: boolean;
  uploadProgress?: number;
  uploadProgressTotal?: number;
};

const FormHeading = ({
  title,
  isSubmitting,
  uploadProgress,
  uploadProgressTotal,
}: FormProductAddHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-4">
        <Heading tag="h1" size="sm" weight="semi">
          {title || ""}
        </Heading>
        {isSubmitting && (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            {isSubmitting && (
              <span className="text-sm">
                Uploading {uploadProgress} of {uploadProgressTotal} images
              </span>
            )}
          </div>
        )}
      </div>
      <Divider position="horizontal" color="bg-grayBackned-900" />
    </>
  );
};

export default FormHeading;
