export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-label="Loading page">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-cinnabar dark:border-stone-700" />
    </div>
  );
}
