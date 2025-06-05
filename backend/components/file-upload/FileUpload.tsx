"use client";
import { useState, useEffect, useRef } from "react";
import { CloudUpload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface FilePreview {
  url: string;
  file: File | null;
  isUploading: boolean;
  isInitial: boolean;
}

interface FileUploadProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
  onChange: (files: (string | File | null)[]) => void;
  onRemove?: (removedFile: File | string) => void;
  resetKey?: number;
  multiple?: boolean;
  initialUrls?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  register,
  setValue,
  errors,
  onChange,
  onRemove,
  resetKey = 0,
  multiple = false,
  initialUrls = [],
}) => {
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  const [uploadingStates, setUploadingStates] = useState<boolean[]>([]);

  // Refs to track initialization state and previous initialUrls
  const initializedRef = useRef(false);
  const prevInitialUrlsRef = useRef<string[]>([]);

  // Reset previews when resetKey changes
  useEffect(() => {
    if (resetKey > 0) {
      setPreviews([]);
      setUploadingStates([]);
      initializedRef.current = false;
    }
  }, [resetKey]);

  // Initialize with initial URLs - only once or when URLs change significantly
  useEffect(() => {
    // Skip if already initialized with the same URLs
    const prevUrls = prevInitialUrlsRef.current;
    const areUrlsEqual =
      prevUrls.length === initialUrls.length &&
      prevUrls.every((url, i) => url === initialUrls[i]);

    if (initializedRef.current && areUrlsEqual) {
      return;
    }

    // Filter out any empty URLs
    const validUrls = initialUrls.filter((url) => url && url.trim() !== "");

    if (validUrls.length > 0) {
      const initialPreviews = validUrls.map((url) => ({
        url: url,
        file: null,
        isUploading: false,
        isInitial: true,
      }));

      setPreviews(initialPreviews);
      setUploadingStates(new Array(initialPreviews.length).fill(false));

      // Mark as initialized and update previous URLs reference
      initializedRef.current = true;
      prevInitialUrlsRef.current = [...validUrls];

      // Set initial value for the form (without triggering another effect)
      setValue(name, validUrls, { shouldDirty: true });
    }
  }, [initialUrls, setValue, name]);

  // Handle file upload
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const newPreviews: FilePreview[] = files.map((file) => ({
        url: URL.createObjectURL(file),
        file: file,
        isUploading: true,
        isInitial: false,
      }));

      // Either append to existing or replace based on multiple flag
      const updatedPreviews = multiple
        ? [...previews, ...newPreviews]
        : newPreviews;

      setPreviews(updatedPreviews);

      // Set uploading states
      const newUploadingStates = multiple
        ? [...uploadingStates, ...files.map(() => true)]
        : new Array(files.length).fill(true);

      setUploadingStates(newUploadingStates);

      // Simulate upload completion
      files.forEach((_, index) => {
        const targetIndex = multiple ? previews.length + index : index;
        setTimeout(() => {
          setUploadingStates((prev) => {
            const newStates = [...prev];
            newStates[targetIndex] = false;
            return newStates;
          });

          // Update form value after upload completes
          updateFormValue(updatedPreviews);
        }, 1000 + index * 500);
      });
    }
  };

  // Helper to update form value based on current previews
  const updateFormValue = (currentPreviews: FilePreview[]) => {
    const formValue = currentPreviews
      .map((p) => (p.isInitial ? p.url : p.file))
      .filter(Boolean);

    setValue(name, formValue);
    if (onChange) {
      onChange(formValue);
    }
  };

  // Remove an image from previews
  const removeImage = (index: number): void => {
    const previewToRemove = previews[index];

    // Revoke URL if it's a blob URL (for uploaded files)
    if (!previewToRemove.isInitial && previewToRemove.url.startsWith("blob:")) {
      URL.revokeObjectURL(previewToRemove.url);
    }

    // Remove the preview
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);

    // Remove uploading state
    setUploadingStates((prev) => prev.filter((_, i) => i !== index));

    // Update form value
    updateFormValue(updatedPreviews);

    if (onRemove) {
      onRemove(
        previewToRemove.isInitial ? previewToRemove.url : previewToRemove.file!
      );
    }
  };

  // Clean up blob URLs when component is unmounted
  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (!p.isInitial && p.url.startsWith("blob:")) {
          URL.revokeObjectURL(p.url);
        }
      });
    };
  }, [previews]);

  return (
    <div className="w-full">
      <label className="flex flex-col items-center gap-2 cursor-pointer border-2 border-dashed border-blue-400 rounded-lg my-4 p-6 transition-colors hover:bg-blue-50">
        <CloudUpload className="text-blue-600" size={33} />
        <span className="text-lg font-medium">{label}</span>
        <span className="text-sm text-gray-500">
          1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
        </span>
        <input
          id={name}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          multiple={multiple}
          {...register(name)}
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {errors[name] && previews.length === 0 && (
        <span className="text-red-500 text-sm block mt-1">
          {errors[name]?.message?.toString()}
        </span>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {previews.map((preview, index) => (
          <div
            key={`${preview.url}-${index}`}
            className="relative group rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="relative w-full h-48">
              <Image
                priority
                src={preview.url}
                alt={`preview-${index}`}
                fill
                className="object-cover transition-opacity duration-200 group-hover:opacity-75"
                unoptimized
              />
              {uploadingStates[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
