import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { Button } from "@/components/ui/button";
import { ClipboardX, Edit, Save } from "lucide-react";

interface PageHeaderProps {
    title: string;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    isPending: boolean;
  }

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    editMode,
    setEditMode,
    isPending,
  }) => {
    return (
      <div className="flex items-center gap-4 h-10">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {title}
        </h1>
        {isPending ? (
          <div className="items-center gap-2 ml-auto flex">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="items-center gap-2 md:ml-auto flex">
            {editMode ? (
              <>
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={(e) => {
                      // reset to original values here
                      e.preventDefault();
                      setEditMode(false);
                    }}
                  >
                    <ClipboardX className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Discard
                    </span>
                  </Button>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button size="sm" className="h-8 gap-1" type="submit">
                    <Save className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Save
                    </span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-8 gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditMode(true);
                  }}
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Edit
                  </span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };