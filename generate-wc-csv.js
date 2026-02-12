const fs = require('fs');

const products = [
  {
    "id": "tesa",
    "name": "TESA",
    "image": "https://helivexv2.vercel.app/TESA.png",
    "description": "High purity TESA for research purposes.",
    "category": "Peptides",
    "strengths": [
      { "id": "5mg", "label": "5mg", "price": 45 },
      { "id": "10mg", "label": "10mg", "price": 85 }
    ]
  },
  {
    "id": "vip",
    "name": "VIP",
    "image": "https://helivexv2.vercel.app/VIP.png",
    "description": "Premium VIP research compound.",
    "category": "Peptides",
    "strengths": [
      { "id": "2mg", "label": "2mg", "price": 50 },
      { "id": "5mg", "label": "5mg", "price": 110 }
    ]
  },
  {
    "id": "mots-c",
    "name": "MOTS-C",
    "image": "https://helivexv2.vercel.app/motsc.png",
    "description": "High-grade MOTS-C research peptide.",
    "category": "Peptides",
    "strengths": [
      { "id": "5mg", "label": "5mg", "price": 45 },
      { "id": "10mg", "label": "10mg", "price": 80 }
    ]
  },
  {
    "id": "mt-2",
    "name": "MT-2",
    "image": "https://helivexv2.vercel.app/MT-2.png",
    "description": "MT-2 peptide for scientific research.",
    "category": "Peptides",
    "strengths": [
      { "id": "10mg", "label": "10mg", "price": 40 }
    ]
  },
  {
    "id": "tirz",
    "name": "TIRZEPATIDE",
    "image": "https://helivexv2.vercel.app/glp2t.png",
    "description": "High-purity Tirzepatide for advanced research applications.",
    "category": "Peptides",
    "strengths": [
      { "id": "10mg", "label": "10mg", "price": 120 }
    ]
  },
  {
    "id": "reta",
    "name": "RETATRUTIDE",
    "image": "https://helivexv2.vercel.app/retatrutide.png",
    "description": "Next-generation research compound for metabolic studies.",
    "category": "Peptides",
    "strengths": [
      { "id": "5mg", "label": "5mg", "price": 150 }
    ]
  },
  {
    "id": "klow",
    "name": "KLOW",
    "image": "https://helivexv2.vercel.app/KLOW.png",
    "description": "KLOW Blend is a regenerative peptide complex combining GHK-Cu, BPC-157, TB-500, and KPV.",
    "category": "Peptides",
    "strengths": [
      { "id": "80mg", "label": "80mg", "price": 210 }
    ]
  }
];

let csv = "Type,SKU,Name,Description,Categories,Images,Attribute 1 name,Attribute 1 value(s),Attribute 1 visible,Attribute 1 global,Parent,Regular price\n";

products.forEach(p => {
  // Main Variable Product
  const strengthsStr = p.strengths.map(s => s.label).join(", ");
  csv += `variable,${p.id},"${p.name}","${p.description}","${p.category}","${p.image}",Strength,"${strengthsStr}",1,1,,\n`;
  
  // Variations
  p.strengths.forEach(s => {
    csv += `variation,${p.id}-${s.id},"${p.name} - ${s.label}","","","","",${s.label},1,1,${p.id},${s.price}\n`;
  });
});

fs.writeFileSync('woocommerce-products.csv', csv);
console.log("CSV generated successfully!");
