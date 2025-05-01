import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const Publications = () => {
  // Sample publications data
  const [publications, setPublications] = useState([
    {
      id: "1",
      title: "Introduction to Computer Science",
      type: "Course",
      date: "2023-04-15",
      status: "Published",
    },
    {
      id: "2",
      title: "Data Structures and Algorithms",
      type: "Course",
      date: "2023-05-20",
      status: "Published",
    },
    {
      id: "3",
      title: "Database Systems Lab",
      type: "TP",
      date: "2023-06-10",
      status: "Published",
    },
    {
      id: "4",
      title: "Web Development Exercises",
      type: "TD",
      date: "2023-07-05",
      status: "Draft",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [publicationToDelete, setPublicationToDelete] = useState(null);

  // Filter publications based on search and filter
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || pub.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleDelete = (id) => {
    setPublicationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setPublications(publications.filter(pub => pub.id !== publicationToDelete));
    setDeleteDialogOpen(false);
    setPublicationToDelete(null);
  };

  // Simple UI components
  const Badge = ({ children, variant = 'default' }) => {
    const baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
    const variants = {
      default: "bg-blue-100 text-blue-800",
      secondary: "bg-gray-100 text-gray-800",
    };
    return <span className={`${baseStyle} ${variants[variant]}`}>{children}</span>;
  };

  const Button = ({ children, variant = 'default', size = 'default', ...props }) => {
    const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "hover:bg-gray-100",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    };
    const sizes = {
      default: "h-10 px-4 py-2",
      icon: "h-9 w-9",
    };
    return (
      <button className={`${baseStyle} ${variants[variant]} ${sizes[size]}`} {...props}>
        {children}
      </button>
    );
  };

  const Input = ({ placeholder, value, onChange, className = '', ...props }) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );

  const Select = ({ value, onValueChange, children, ...props }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative" {...props}>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span>{value || 'Select...'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 opacity-50"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {children}
          </div>
        )}
      </div>
    );
  };

  const SelectContent = ({ children }) => <div className="p-1">{children}</div>;

  const SelectItem = ({ children, value, onSelect, ...props }) => (
    <button
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100"
      onClick={() => {
        onSelect(value);
        props.onClick?.();
      }}
      {...props}
    >
      {children}
    </button>
  );

  const Table = ({ children }) => (
    <div className="w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">{children}</table>
    </div>
  );

  const TableHeader = ({ children }) => <thead className="[&_tr]:border-b">{children}</thead>;

  const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;

  const TableRow = ({ children }) => (
    <tr className="border-b transition-colors hover:bg-gray-100/50">
      {children}
    </tr>
  );

  const TableHead = ({ children, className = '' }) => (
    <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 ${className}`}>
      {children}
    </th>
  );

  const TableCell = ({ children, className = '' }) => (
    <td className={`p-4 align-middle ${className}`}>{children}</td>
  );

  const DropdownMenu = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative inline-block text-left">
        {React.Children.map(children, child => 
          React.cloneElement(child, { open, setOpen })
        )}
      </div>
    );
  };

  const DropdownMenuTrigger = ({ children, asChild, ...props }) => {
    if (asChild) {
      return React.cloneElement(React.Children.only(children), { 
        onClick: () => props.setOpen(!props.open),
        ...props
      });
    }
    return (
      <button
        onClick={() => props.setOpen(!props.open)}
        {...props}
      >
        {children}
      </button>
    );
  };

  const DropdownMenuContent = ({ children, align = 'start', open }) => {
    if (!open) return null;
    const alignment = {
      start: 'left-0',
      end: 'right-0',
    };
    return (
      <div
        className={`absolute ${alignment[align]} z-50 mt-2 w-56 origin-top-right rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className="p-1">{children}</div>
      </div>
    );
  };

  const DropdownMenuItem = ({ children, className = '', ...props }) => (
    <button
      className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 w-full text-left ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  const DropdownMenuSeparator = () => <div className="-mx-1 my-1 h-px bg-gray-200" />;

  const AlertDialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
          {children}
        </div>
      </div>
    );
  };

  const AlertDialogContent = ({ children }) => <div>{children}</div>;

  const AlertDialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

  const AlertDialogTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>;

  const AlertDialogDescription = ({ children }) => <p className="text-sm text-gray-600">{children}</p>;

  const AlertDialogFooter = ({ children }) => <div className="mt-4 flex justify-end gap-2">{children}</div>;

  const AlertDialogCancel = ({ children, ...props }) => (
    <button
      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      {...props}
    >
      {children}
    </button>
  );

  const AlertDialogAction = ({ children, ...props }) => (
    <button
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      {...props}
    >
      {children}
    </button>
  );

  // Icons
  const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );

  const FileTextIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );

  const MoreHorizontalIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );

  const DownloadCloudIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m8 17 4 4 4-4" />
    </svg>
  );

  const EditIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  const Trash2Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Publications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your courses, TDs, TPs and other publications
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
          <Input
            placeholder="Search publications..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" onSelect={setTypeFilter}>All Types</SelectItem>
            <SelectItem value="course" onSelect={setTypeFilter}>Courses</SelectItem>
            <SelectItem value="td" onSelect={setTypeFilter}>TDs</SelectItem>
            <SelectItem value="tp" onSelect={setTypeFilter}>TPs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPublications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No publications found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPublications.map((pub) => (
                <TableRow key={pub.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileTextIcon />
                      {pub.title}
                    </div>
                  </TableCell>
                  <TableCell>{pub.type}</TableCell>
                  <TableCell>{new Date(pub.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={pub.status === "Published" ? "default" : "secondary"}>
                      {pub.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <EditIcon className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DownloadCloudIcon className="mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(pub.id)}
                        >
                          <Trash2Icon className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the publication.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

Publications.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default Publications;