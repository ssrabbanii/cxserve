import { Skeleton } from "../ui/skeleton";

interface PageHeaderProps {
    title: string;
  }
  
  export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    return <div className="text-3xl font-medium">{title}</div>;
  };

  export const PageHeaderLoading = () => {
    return <Skeleton className="h-8 w-1/2" />;
  };