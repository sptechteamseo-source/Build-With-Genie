"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  label?: string
}

export function ImageUpload({ value, onChange, onRemove, label = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Upload failed")
      }
      const data = await res.json()
      onChange(data.url)
      toast.success("Image uploaded successfully")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  if (value) {
    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={value}
          alt="Uploaded"
          style={{ width: "100%", maxWidth: 400, height: 200, objectFit: "cover", borderRadius: 8, border: "1px solid var(--line)" }}
        />
        <button
          type="button"
          onClick={() => { onRemove ? onRemove() : onChange("") }}
          style={{
            position: "absolute", top: 8, right: 8,
            background: "rgba(0,0,0,0.7)", border: "none", borderRadius: "50%",
            width: 28, height: 28, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
          }}
        >
          <X size={14} />
        </button>
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      style={{
        border: "2px dashed var(--line)",
        borderRadius: 8,
        padding: "32px 24px",
        textAlign: "center",
        cursor: uploading ? "not-allowed" : "pointer",
        background: "var(--bg-1)",
        transition: "border-color 0.15s",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f) }}
        disabled={uploading}
      />
      {uploading ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Loader2 size={24} style={{ color: "var(--accent)", animation: "spin 1s linear infinite" }} />
          <span style={{ fontSize: 13, color: "var(--fg-2, #888)" }}>Uploading...</span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: "color-mix(in srgb, var(--accent) 12%, transparent)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Upload size={20} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)" }}>{label}</div>
            <div style={{ fontSize: 12, color: "var(--fg-2, #888)", marginTop: 2 }}>
              Drag & drop or click to browse · PNG, JPG, WebP up to 10MB
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
