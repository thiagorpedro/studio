import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This section is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Settings for managing your gym, billing, and integrations will be available here in a future update.</p>
        </CardContent>
      </Card>
    </div>
  );
}
