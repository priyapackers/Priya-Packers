import {
  BadgeCheck,
  Boxes,
  Factory,
  Globe2,
  Leaf,
  PackageCheck,
  PackageOpen,
  Printer,
  Recycle,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import type { ComponentType } from "react";

export type IconComponent = ComponentType<{ className?: string }>;

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: IconComponent;
}

export interface ProductItem extends FeatureItem {
  href: string;
}

export interface VisualItem {
  title: string;
  description: string;
  image: string;
}

export const company = {
  name: "Priya Packers",
  email: "priyapackers1313@gmail.com",
  phone: "+91 XXXXX XXXXX",
  address: "Manufacturing unit address, India",
  whatsapp: "https://wa.me/",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Certifications", href: "/certifications" },
  { label: "Export Solutions", href: "/export-solutions" },
  { label: "Contact", href: "/contact" },
];

export const highlights: FeatureItem[] = [
  {
    title: "Export-focused packaging",
    description:
      "Packaging formats and carton specifications planned for international shipping, palletization, and buyer compliance.",
    icon: Globe2,
  },
  {
    title: "Custom manufacturing",
    description:
      "Corrugated boxes, printed cartons, and industrial packaging built around product size, strength, and branding needs.",
    icon: Factory,
  },
  {
    title: "Paper-first solutions",
    description:
      "Renewable, recyclable, and cost-efficient paper packaging options for brands moving toward sustainable supply chains.",
    icon: Recycle,
  },
];

export const products: ProductItem[] = [
  {
    title: "Corrugated Boxes",
    description:
      "Durable single-wall and multi-wall boxes for industrial, retail, and export movement.",
    icon: Boxes,
    href: "/products#corrugated-boxes",
  },
  {
    title: "Printed Boxes",
    description:
      "Brand-ready corrugated cartons with clean print surfaces for product identification and presentation.",
    icon: Printer,
    href: "/products#printed-boxes",
  },
  {
    title: "Duplex Boxes",
    description:
      "Lightweight paperboard packaging for display, FMCG, and secondary packaging requirements.",
    icon: PackageOpen,
    href: "/products#duplex-boxes",
  },
  {
    title: "E-commerce Packaging",
    description:
      "Mailer boxes and shipper cartons designed for fast dispatch, returns, and courier handling.",
    icon: ShoppingBag,
    href: "/products#e-commerce-packaging",
  },
  {
    title: "Industrial Packaging",
    description:
      "Heavy-duty cartons and protective packaging for manufacturing, machinery, and component shipments.",
    icon: ShieldCheck,
    href: "/products#industrial-packaging",
  },
  {
    title: "Custom Packaging",
    description:
      "Purpose-built cartons, inserts, partitions, and packaging systems aligned to buyer specifications.",
    icon: PackageCheck,
    href: "/products#custom-packaging",
  },
];

export const whyChooseUs: FeatureItem[] = [
  {
    title: "Consistent quality control",
    description:
      "Material checks, dimensional accuracy, print checks, and packing inspection support dependable dispatches.",
    icon: BadgeCheck,
  },
  {
    title: "Reliable bulk capacity",
    description:
      "Production planning for recurring orders, seasonal demand, and export shipment timelines.",
    icon: Factory,
  },
  {
    title: "Sustainable material choices",
    description:
      "Paper-based packaging with recyclable substrates and kraft aesthetics for responsible global buyers.",
    icon: Leaf,
  },
  {
    title: "Logistics-ready approach",
    description:
      "Cartons designed for handling, container loading, stacking, and warehouse movement.",
    icon: Truck,
  },
];

export const capabilities = [
  "Corrugation and board conversion",
  "Custom carton sizing and die-cutting",
  "Printing and branded packaging support",
  "Bulk order production planning",
  "Warehouse-ready packing and dispatch",
  "Quality checks before final shipment",
];

export const industries = [
  "Textiles and garments",
  "Food and FMCG",
  "Engineering components",
  "Electronics",
  "E-commerce brands",
  "Consumer goods",
  "Automotive suppliers",
  "Export houses",
];

export const testimonials = [
  {
    quote:
      "Priya Packers understood our export carton requirements and delivered packaging that held up through long-distance handling.",
    author: "Procurement Head",
    company: "Industrial exporter",
  },
  {
    quote:
      "The team is responsive, practical, and reliable for recurring corrugated packaging orders.",
    author: "Operations Manager",
    company: "Consumer goods manufacturer",
  },
  {
    quote:
      "Their printed cartons gave our product shipments a cleaner and more professional market presentation.",
    author: "Founder",
    company: "D2C packaging buyer",
  },
];

export const infrastructureItems: VisualItem[] = [
  {
    title: "Manufacturing plant",
    description:
      "A focused production environment for corrugated packaging, carton conversion, and bulk order execution.",
    image: "/images/plant-floor.svg",
  },
  {
    title: "Machinery",
    description:
      "Equipment setup for corrugation, cutting, creasing, printing support, and finishing workflows.",
    image: "/images/machinery.svg",
  },
  {
    title: "Warehouse",
    description:
      "Organized storage and dispatch readiness for raw materials, finished boxes, and recurring orders.",
    image: "/images/warehouse.svg",
  },
  {
    title: "Quality control",
    description:
      "Inspection points for material strength, size tolerance, finishing, and packing consistency.",
    image: "/images/quality-control.svg",
  },
];

export const certifications: FeatureItem[] = [
  {
    title: "ISO Certification",
    description:
      "Placeholder for ISO quality management certification details and registration number.",
    icon: BadgeCheck,
  },
  {
    title: "GST Registered",
    description:
      "Placeholder for GST registration details supporting domestic and export business documentation.",
    icon: ShieldCheck,
  },
  {
    title: "Export Ready",
    description:
      "Documentation and packaging practices aligned to international buyer expectations.",
    icon: Globe2,
  },
  {
    title: "Quality Assurance",
    description:
      "Internal checks for material quality, carton strength, printing, and shipment readiness.",
    icon: PackageCheck,
  },
];

export const exportPillars: FeatureItem[] = [
  {
    title: "Global packaging solutions",
    description:
      "Corrugated and paper packaging formats for Europe, USA, Middle East, and other export destinations.",
    icon: Globe2,
  },
  {
    title: "Custom export packaging",
    description:
      "Carton strength, dimensions, markings, and packing layouts tailored to buyer and logistics needs.",
    icon: PackageCheck,
  },
  {
    title: "Sustainable packaging",
    description:
      "Paper-based, recyclable packaging choices that support brand sustainability goals.",
    icon: Leaf,
  },
  {
    title: "Bulk manufacturing capability",
    description:
      "Production coordination for high-volume carton orders and repeat procurement cycles.",
    icon: Factory,
  },
  {
    title: "Reliable logistics support",
    description:
      "Packaging guidance for palletization, container movement, warehousing, and shipment handling.",
    icon: Truck,
  },
];

export const faqs = [
  {
    question: "Can Priya Packers manufacture custom-size corrugated boxes?",
    answer:
      "Yes. Boxes can be planned around product dimensions, required strength, print needs, and shipment format.",
  },
  {
    question: "Do you support export packaging requirements?",
    answer:
      "Yes. The company focuses on export-ready cartons, bulk orders, custom specifications, and reliable dispatch planning.",
  },
  {
    question: "Can I request printed or branded packaging?",
    answer:
      "Yes. Printed boxes and branded cartons can be developed for product presentation, identification, and buyer documentation.",
  },
  {
    question: "Are sustainable packaging options available?",
    answer:
      "Yes. Priya Packers offers paper-based packaging solutions using recyclable corrugated and kraft materials.",
  },
];
