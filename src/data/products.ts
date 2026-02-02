export interface ProductStrength {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  strengths: ProductStrength[];
  hasKit: boolean;
  kitPrice?: number;
  coaImage?: string;
  coaBatch?: string;
  coaMass?: string;
  coaDate?: string;
}

export const products: Product[] = [
  {
    "id": "tesa",
    "name": "TESA",
    "image": "/vial.png",
    "description": "High purity TESA for research purposes.",
    "category": "Peptides",
    "isBestSeller": true,
    "strengths": [
      {
        "id": "5mg",
        "label": "5mg",
        "price": 45
      },
      {
        "id": "10mg",
        "label": "10mg",
        "price": 85
      }
    ],
    "hasKit": true,
    "kitPrice": 280,
    "coaImage": "/coa-placeholder.jpg",
    "coaBatch": "HXV-TESA-2026-01",
    "coaMass": "5162.34 g/mol",
    "coaDate": "JAN 15, 2026"
  },
  {
    "id": "vip",
    "name": "VIP",
    "image": "/vial.png",
    "description": "Premium VIP research compound.",
    "category": "Peptides",
    "strengths": [
      {
        "id": "2mg",
        "label": "2mg",
        "price": 50
      },
      {
        "id": "5mg",
        "label": "5mg",
        "price": 110
      }
    ],
    "hasKit": true,
    "kitPrice": 350,
    "coaImage": "/coa-placeholder.jpg",
    "coaBatch": "HXV-VIP-2026-01",
    "coaMass": "5162.34 g/mol",
    "coaDate": "JAN 15, 2026"
  },
  {
    "id": "mots-c",
    "name": "MOTS-C",
    "image": "/vial.png",
    "description": "High-grade MOTS-C research peptide.",
    "category": "Peptides",
    "isNew": true,
    "strengths": [
      {
        "id": "5mg",
        "label": "5mg",
        "price": 45
      },
      {
        "id": "10mg",
        "label": "10mg",
        "price": 80
      }
    ],
    "hasKit": false,
    "coaImage": "/coa-placeholder.jpg",
    "coaBatch": "HXV-MOTSC-2026-01",
    "coaMass": "5162.34 g/mol",
    "coaDate": "JAN 15, 2026"
  },
  {
    "id": "mt-2",
    "name": "MT-2",
    "image": "/vial.png",
    "description": "MT-2 peptide for scientific research.",
    "category": "Peptides",
    "strengths": [
      {
        "id": "10mg",
        "label": "10mg",
        "price": 40
      }
    ],
    "hasKit": true,
    "kitPrice": 150,
    "coaImage": "/coa-placeholder.jpg",
    "coaBatch": "HXV-MT2-2026-01",
    "coaMass": "5162.34 g/mol",
    "coaDate": "JAN 15, 2026"
  },
  {
    "id": "tirz",
    "name": "TIRZEPATIDE",
    "image": "/vial.png",
    "description": "High-purity Tirzepatide for advanced research applications.",
    "category": "Peptides",
    "strengths": [
      {
        "id": "10mg",
        "label": "10mg",
        "price": 120
      }
    ],
    "hasKit": true,
    "kitPrice": 450,
    "coaImage": "/t30barn.png",
    "coaBatch": "K748---003",
    "coaMass": "37.31 mg 34.92 mg and 34.60 mg",
    "coaDate": "26 NOV 2025"
  },
  {
    "id": "reta",
    "name": "RETATRUTIDE",
    "image": "/retatrutide.png",
    "description": "Next-generation research compound for metabolic studies.",
    "category": "Peptides",
    "strengths": [
      {
        "id": "5mg",
        "label": "5mg",
        "price": 150
      }
    ],
    "hasKit": true,
    "kitPrice": 550,
    "coaImage": "/coa-placeholder.jpg",
    "coaBatch": "HXV-RETA-2026-01",
    "coaMass": "5162.34 g/mol",
    "coaDate": "JAN 15, 2026"
  },
  {
    "id": "prod_1770021729445",
    "name": "KLOW",
    "image": "/vial.png",
    "description": "KLOW Blend is a regenerative peptide complex combining GHK-Cu, BPC-157, TB-500, and KPV to support tissue repair, reduce inflammation, and enhance recovery.",
    "category": "Peptides",
    "strengths": [
      {
        "id": "5mg",
        "label": "80mg",
        "price": 210
      }
    ],
    "hasKit": false,
    "coaImage": "/coa-placeholder.jpg"
  }
];
