// "use client"

// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { LogOut, User } from "lucide-react"
// import { ThemeToggle } from "@/components/ThemeToggle"

// export function Navbar() {
//   const user= localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user") || "null")
//     : null;
//   return (
//     <header className="w-full border-b bg-background">
//       <div className="flex h-14 items-center justify-between px-6">
//         {/* Left */}
//         <div className="flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold">
//             📝
//           </div>
//           <span className="text-lg font-semibold">NoteAI</span>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-4">
//           <ThemeToggle />

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
//                 <Avatar className="h-9 w-9">
//                   <AvatarFallback className="bg-orange-100 text-orange-600 cursor-pointer">
//                     {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuLabel>
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium">{user?.name || "User"}</p>
//                   <p className="text-xs text-muted-foreground">
//                     {user?.email || "No email"}
//                   </p>
//                 </div>
//               </DropdownMenuLabel>

//               <DropdownMenuSeparator />

//               <DropdownMenuItem
//   onClick={() => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   }}
//   className="text-red-600 focus:text-red-600"
// >
//   <LogOut className="mr-2 h-4 w-4" />
//   Log out
// </DropdownMenuItem>

//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   )
// }
"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Navbar() {
  const user= localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-sm">
            ✓
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight text-foreground">NoteAI</span>
            <span className="text-xs text-muted-foreground">Smart Notes</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full p-0 hover:bg-accent">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm cursor-pointer">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email || "No email"}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
