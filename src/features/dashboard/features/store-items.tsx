import { Brain, Pill, Syringe, Tablets } from "lucide-react"

export function StoreItems({ item }: { item: string }) {
    if (item === "Injectables") {
        return <Syringe />
    } else if (item === "Emergency Drugs") {
        return <Pill />
    } else if (item === "Consumables") {
        return <Tablets />
    } else if (item === "Neuro-Specific") {
        return <Brain />
    }
}
