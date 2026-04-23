export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-muted/50">
          © {new Date().getFullYear()} Faran Raheel Raja
        </p>
        <p className="text-xs font-mono text-muted/30">
          Built with React · Vite · Tailwind · Three.js
        </p>
      </div>
    </footer>
  );
}
