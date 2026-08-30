"use client";

import { useState } from "react";
import { createClientItemAction } from "@/app/admin/actions";

interface AddItemFormProps {
  clientId: string;
}

export function AddItemForm({ clientId }: AddItemFormProps) {
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [bandhan, setBandhan] = useState("2");

  const l = Number(length);
  const b = Number(breadth);
  const h = Number(height);

  const reelSize =
    b > 0 && h > 0
      ? b + h + 1
      : null;

  const cuttingSize =
    l > 0 && b > 0
      ? bandhan === "1"
        ? (l + b) * 2 + 2
        : l + b + 2
      : null;

  return (
    <form
      action={createClientItemAction.bind(null, clientId)}
      className="max-w-3xl rounded-lg border border-[#e6e0d7] bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Item Name
          </label>

          <input
            name="itemName"
            required
            placeholder="Example: 5kg Rice Box"
            className="min-h-11 w-full rounded-md border border-[#ddd5ca] px-3 text-sm"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold">
            Box Size
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs text-[#58606b]">
                Length
              </label>

              <input
                name="length"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="min-h-11 w-full rounded-md border border-[#ddd5ca] px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-[#58606b]">
                Breadth
              </label>

              <input
                name="breadth"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={breadth}
                onChange={(e) => setBreadth(e.target.value)}
                className="min-h-11 w-full rounded-md border border-[#ddd5ca] px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-[#58606b]">
                Height
              </label>

              <input
                name="height"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="min-h-11 w-full rounded-md border border-[#ddd5ca] px-3 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Bandhan
            </label>

            <select
              name="bandhan"
              value={bandhan}
              onChange={(e) => setBandhan(e.target.value)}
              className="min-h-11 w-full rounded-md border border-[#ddd5ca] px-3 text-sm"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Ply
            </label>

            <select
              name="ply"
              defaultValue="5"
              className="min-h-11 w-full rounded-md border border-[#ddd5ca] px-3 text-sm"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Flap Kind
            </label>

            <select
              name="flapKind"
              defaultValue="center"
              className="min-h-11 w-full rounded-md border border-[#ddd5ca] px-3 text-sm"
            >
              <option value="center">Center</option>
              <option value="over">Over</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Price of Box
          </label>

          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="₹ 0.00"
            className="min-h-11 w-full rounded-md border border-[#ddd5ca] px-3 text-sm"
          />
        </div>

        <div className="grid gap-4 rounded-md bg-[#f2eadf] p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a6b30]">
              Reel Size
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#0b2341]">
              {reelSize !== null ? reelSize.toFixed(2) : "—"}
            </p>

            <p className="mt-1 text-xs text-[#58606b]">
              Breadth + Height + 1
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a6b30]">
              Cutting Size
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#0b2341]">
              {cuttingSize !== null ? cuttingSize.toFixed(2) : "—"}
            </p>

            <p className="mt-1 text-xs text-[#58606b]">
              {bandhan === "1"
                ? "[(Length + Breadth) × 2] + 2"
                : "(Length + Breadth) + 2"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            className="min-h-11 rounded-md bg-[#0b2341] px-5 py-3 text-sm font-semibold text-white"
          >
            Save Item
          </button>

          <a
            href={`/admin/clients/${clientId}`}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#ddd5ca] px-5 py-3 text-sm font-semibold"
          >
            Cancel
          </a>
        </div>
      </div>
    </form>
  );
}