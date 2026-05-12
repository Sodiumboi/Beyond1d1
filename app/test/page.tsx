// app/test/page.tsx — DELETE THIS after verifying
import { Button, Card, HpBar, StatusBadge, ClassBadge, ThemeSwitcher } from '@/components/ui'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-bg-base p-8 flex flex-col gap-6">
      <h1 className="font-serif text-3xl text-text-primary">Design System Test</h1>

      <div>
        <p className="text-text-muted text-xs uppercase tracking-widest mb-3">Theme switcher</p>
        <ThemeSwitcher />
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button variant="primary">Roll Initiative</Button>
        <Button variant="secondary">Open Sheet</Button>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <StatusBadge status="active" />
        <StatusBadge status="resting" />
        <StatusBadge status="archived" />
        <StatusBadge status="dead" />
        <ClassBadge cls="Wizard" level={11} />
        <ClassBadge cls="Ranger" level={8} />
      </div>

      <div className="flex gap-4">
        <Card className="p-4 flex-1">
          <p className="text-text-secondary text-sm mb-4">Tharivol — healthy</p>
          <HpBar current={55} max={62} />
        </Card>
        <Card className="p-4 flex-1">
          <p className="text-text-secondary text-sm mb-4">Aldric — wounded</p>
          <HpBar current={18} max={52} />
        </Card>
        <Card className="p-4 flex-1">
          <p className="text-text-secondary text-sm mb-4">Mira — critical</p>
          <HpBar current={4} max={42} />
        </Card>
        <Card className="p-4 flex-1">
          <p className="text-text-secondary text-sm mb-4">Goblin — dead</p>
          <HpBar current={0} max={12} />
        </Card>
      </div>
    </div>
  )
}