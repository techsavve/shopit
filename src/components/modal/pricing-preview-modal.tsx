
import { Modal } from "@mantine/core"
import React from "react"

interface PricingPreviewModalProps {
  opened: boolean
  onClose: () => void
  packages: { name: string; amount: number }[]
  interval?: string
  accountType?: string
}

export const PricingPreviewModal: React.FC<PricingPreviewModalProps> = ({
  opened,
  onClose,
  packages,
  interval,
  accountType,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="SDK Pricing Preview"
      centered
      size="lg"
      overlayProps={{ opacity: 0.4 }}
    >
      <div className="space-y-3">
        {packages?.map((pkg, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-semibold capitalize">{pkg.name}</p>
              {accountType === "subscription" && (
                <p className="text-xs text-gray-500">
                  {interval ? `Billed ${interval}` : "Subscription"}
                </p>
              )}
            </div>
            <p className="text-right font-bold text-gray-800 text-lg">
              ${pkg.amount?.toFixed(2)}
            </p>
          </div>
        ))}
        {packages?.length === 0 && (
          <p className="text-sm text-gray-500">No packages configured yet.</p>
        )}
      </div>
    </Modal>
  )
} 

export default PricingPreviewModal




