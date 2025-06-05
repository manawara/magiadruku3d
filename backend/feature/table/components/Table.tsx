import { useLocale } from "next-intl";
import React from "react";
import { motion } from "framer-motion";
import { X, Edit, Eye, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
interface TableProps<T extends { id: string | number }> {
  headingContent: Array<{ title: string; key: keyof T }>;
  items: T[];
  isLoading?: boolean;
  onView?: (id: string | number) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

const Table = <T extends { id: string | number }>({
  headingContent,
  items,
  onView,
  onEdit,
  onDelete,
  isLoading,
}: TableProps<T>) => {
  const locale = useLocale();
  const t = useTranslations("Backend.general");
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      backgroundColor: "rgba(243, 244, 246, 0.2)",
      transition: { duration: 0.2 },
    },
  };

  const getLocalizedContent = (
    item: T,
    key: keyof T
  ): string | React.ReactNode => {
    const value = item[key];

    // Handle null or undefined values
    if (value === null || value === undefined) {
      return "";
    }

    // Handle React elements
    if (React.isValidElement(value)) {
      return value;
    }

    // Handle arrays (including children arrays)
    if (Array.isArray(value)) {
      // Return the array as is if it contains React elements
      if (value.some((item) => React.isValidElement(item))) {
        return value;
      }
      // Otherwise convert array to string representation
      return value
        .map((item) =>
          item === null || item === undefined ? "" : String(item)
        )
        .join(", ");
    }

    // Handle localized objects
    if (typeof value === "object" && value !== null) {
      const localizedValue = (value as Record<string, any>)[locale];

      // Handle null or undefined localized value
      if (localizedValue === null || localizedValue === undefined) {
        return "";
      }

      // Handle React elements in localized value
      if (React.isValidElement(localizedValue)) {
        return localizedValue;
      }

      // Handle arrays in localized value
      if (Array.isArray(localizedValue)) {
        // Return the array as is if it contains React elements
        if (localizedValue.some((item) => React.isValidElement(item))) {
          return localizedValue;
        }
        // Otherwise convert array to string representation
        return localizedValue
          .map((item) =>
            item === null || item === undefined ? "" : String(item)
          )
          .join(", ");
      }

      // Handle simple types in localized value
      if (
        typeof localizedValue === "string" ||
        typeof localizedValue === "number"
      ) {
        return localizedValue;
      }

      return "[Object]";
    }

    // Handle simple types
    return String(value);
  };
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full border-collapse table-fixed">
        <thead>
          <tr className="bg-primaryBackend-400 text-white border-b border-primaryBackend-400">
            {headingContent.map(({ title, key }) => (
              <th
                key={key.toString()}
                className="text-start py-4 px-4 text-sm font-medium uppercase tracking-wider whitespace-nowrap"
              >
                {title}
              </th>
            ))}
            {(onView || onEdit || onDelete) && (
              <th className="text-right py-4 px-4 text-sm font-medium uppercase tracking-wider whitespace-nowrap">
                {t("actions")}
              </th>
            )}
          </tr>
        </thead>
        <motion.tbody
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          {isLoading ? (
            <tr>
              <td
                colSpan={
                  headingContent.length + (onView || onEdit || onDelete ? 1 : 0)
                }
                className="py-8 text-center text-gray-500"
              >
                <Loader2 className="w-6 h-6 text-gray-500 animate-spin mx-auto mb-2" />
                Loading...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td
                colSpan={
                  headingContent.length + (onView || onEdit || onDelete ? 1 : 0)
                }
                className="py-8 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <motion.tr
                key={item.id}
                className="border-b border-gray-200 transition-colors"
                variants={rowVariants}
                whileHover="hover"
              >
                {headingContent.map((column) => {
                  const value = getLocalizedContent(item, column.key);
                  return (
                    <td
                      key={column.key.toString()}
                      className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap"
                    >
                      {value}
                    </td>
                  );
                })}
                {(onView || onEdit || onDelete) && (
                  <td className="py-4 px-4 text-sm text-gray-700 ml-8 gap-1 flex justify-end">
                    {onView && (
                      <motion.button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onView(item.id)}
                      >
                        <Eye size={18} />
                      </motion.button>
                    )}
                    {onEdit && (
                      <motion.button
                        className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 rounded-md text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(item)}
                      >
                        <Edit size={18} />
                      </motion.button>
                    )}
                    {onDelete && (
                      <motion.button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(item)}
                      >
                        <X size={18} />
                      </motion.button>
                    )}
                  </td>
                )}
              </motion.tr>
            ))
          )}
        </motion.tbody>
      </table>
    </div>
  );
};

export default Table;
