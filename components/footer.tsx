import Link from "next/link"
export default function Footer() {
    return (
      <footer className="bg-primary text-primary-foreground mt-auto">
          <div className="py-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} The Book Reviews. All rights reserved.</p>
          </div>
      </footer>
    )
  }
