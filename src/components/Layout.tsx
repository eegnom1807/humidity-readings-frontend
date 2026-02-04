import { useState, useRef, useEffect } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { LayoutDashboard, Leaf, ChevronDown, Cpu, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function Layout() {
  const [adminOpen, setAdminOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const isAdminActive = location.pathname === "/plants" || location.pathname === "/sensors"

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAdminOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="hidden sm:inline text-xl font-bold">Monitor de plantas</span>
          </div>
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              Panel
            </NavLink>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                  isAdminActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                Administrar
                <ChevronDown className={cn("h-4 w-4 transition-transform", adminOpen && "rotate-180")} />
              </button>

              {adminOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-md border bg-popover p-1 shadow-md">
                  <NavLink
                    to="/plants"
                    onClick={() => setAdminOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )
                    }
                  >
                    <Leaf className="h-4 w-4" />
                    Plantas
                  </NavLink>
                  <NavLink
                    to="/sensors"
                    onClick={() => setAdminOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )
                    }
                  >
                    <Cpu className="h-4 w-4" />
                    Sensores
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
