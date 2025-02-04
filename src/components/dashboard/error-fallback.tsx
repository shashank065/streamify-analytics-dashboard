import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ErrorFallback({ error }: { error: Error }) {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-destructive">Error</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {error.message}
        </p>
      </CardContent>
    </Card>
  );
} 