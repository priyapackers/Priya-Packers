export function SetupNotice({ message = "Database is not configured yet." }: { message?: string }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
      <strong>Setup needed:</strong> {message} Add Neon <code>DATABASE_URL</code>, <code>ADMIN_PASSWORD_HASH</code>, and <code>SESSION_SECRET</code> environment variables, then run the schema script.
    </div>
  );
}
