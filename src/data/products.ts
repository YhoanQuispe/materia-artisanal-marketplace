/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'prod-1',
    title: 'Hand-Thrown Terracotta Olla Vase',
    category: 'Ceramics',
    artisan: 'Yhoan Quispe',
    origin: 'San Marcos Tlapazola, Oaxaca',
    price: 185.00,
    rating: 4.9,
    reviewsCount: 34,
    image: 'https://lolomercadito.com/cdn/shop/files/OLLA-3.jpg?v=1767205717&width=2279',
    stock: 4,
    description: 'This traditional Olla vase is burnished by hand using local river stones, creating its signature deep terracotta sheen without any artificial glazes. Each piece is fired in an open ground-pit kiln, resulting in organic dark smoky fire clouds that make every vase entirely unique.',
    details: [
      '100% locally sourced red clay',
      'Hand-polished with quartz stone for 4 hours',
      'Fired in traditional open fire pits',
      'Designed for decorative use or dry flora'
    ],
    dimensions: '9" H x 7" W (Mouth opening: 3.5")',
    material: 'Natural Red Clay',
    care: 'Wipe with a soft, dry cloth. Do not hold standing water for extended periods as the clay remains beautifully porous.'
  },
  {
    id: 'prod-2',
    title: 'Sabi Speckled Matcha Bowl',
    category: 'Ceramics',
    artisan: 'Yuki Tanaka',
    origin: 'Shigaraki Valley, Japan',
    price: 95.00,
    rating: 4.8,
    reviewsCount: 48,
    image: 'https://www.tezumi.com/cdn/shop/products/il_fullxfull.2489530007_no31.jpg?v=1602496213&width=2820',
    stock: 12,
    description: 'Embodying the philosophy of wabi-sabi, this chawan (matcha bowl) is wheel-thrown using coarse, iron-rich clay from Shigaraki. Coated in a textured ash glaze, the surface mimics the weathered, elegant decay of volcanic stone. Features a wide base to allow seamless whisking.',
    details: [
      'Traditional Shigaraki stoneware',
      'Natural wood-ash and feldspar glaze',
      'Classic organic chawan shape',
      'Food, microwave, and dishwasher safe'
    ],
    dimensions: '3.1" H x 4.7" Diameter',
    material: 'Iron-rich Stoneware',
    care: 'Hand wash recommended with mild soap. Allow to air dry completely before storing.'
  },
  {
    id: 'prod-3',
    title: 'Fluted Stoneware Pitcher',
    category: 'Ceramics',
    artisan: 'Clara Thorne',
    origin: 'Devon, United Kingdom',
    price: 145.00,
    rating: 4.7,
    reviewsCount: 19,
    image: 'https://i.etsystatic.com/34083548/r/il/cb9fb8/7515203219/il_1140xN.7515203219_q6fn.jpg',
    stock: 2,
    description: 'A contemporary take on English farmhouse pottery. This elegant stoneware pitcher features meticulous, hand-carved flutes along the base and a delicate, dripless spout. Finished in a semi-matte oatmeal glaze that exposes speckles of natural iron from the clay body.',
    details: [
      'High-fired stoneware clay',
      'Hand-pulled ergonomic strap handle',
      'Double-dipped oatmeal and chalk glaze',
      'Liquid capacity: 1.2 Liters (approx. 40 oz)'
    ],
    dimensions: '8.5" H x 5" Base Diameter',
    material: 'Stoneware Clay',
    care: 'Dishwasher and food safe. Avoid thermal shock (transitioning directly from freezer to hot oven).'
  },
  {
    id: 'prod-4',
    title: 'Indigo Shibori Linen Throw',
    category: 'Textiles',
    artisan: 'Mei Chen',
    origin: 'Guizhou Highlands, China',
    price: 220.00,
    rating: 4.9,
    reviewsCount: 26,
    image: 'https://images.squarespace-cdn.com/content/v1/5905340e1b631b489217d165/1703299607317-TL68TN8NX2RPAK8NAP8Q/Linen_Throw_Indigo.jpg?format=500w',
    stock: 6,
    description: 'Woven on hand-looms from organic Belgian flax, this medium-weight throw is patterned using traditional folding and clamp-resist Shibori techniques. It is dipped multiple times in a living, naturally fermented indigo vat to achieve its deep, hypnotic ocean-blue tones.',
    details: [
      '100% certified organic long-staple linen',
      'Hand-dyed with farm-grown Indigofera tinctoria',
      'Finished with delicate hand-twisted fringes',
      'Softens beautifully with each subsequent wash'
    ],
    dimensions: '55" W x 75" L',
    material: 'Organic Flax Linen',
    care: 'Machine wash separately on cold, gentle cycle with pH-neutral detergent. Line dry in shade to preserve deep indigo hues.'
  },
  {
    id: 'prod-5',
    title: 'Hand-Woven Alpaca Blanket',
    category: 'Textiles',
    artisan: 'Sophia Huaman',
    origin: 'Sacred Valley, Cusco, Peru',
    price: 295.00,
    rating: 5.0,
    reviewsCount: 42,
    image: 'https://campoalpaca.com/cdn/shop/files/inca-design-alpaca-throw-blanket-percy-red-rainbow.jpg?v=1771983469&width=540',
    stock: 3,
    description: 'An exceptional heirloom blanket made from ultra-soft baby alpaca fibers. Hand-spun on a drop spindle and woven on a traditional backstrap loom, it features fine, minimalist linear patterns dyed with cochineal (reds) and wild marigolds (soft yellows). Unmatched in warmth and softness.',
    details: [
      '100% pure premium baby alpaca wool',
      'Hand-spun and loom-woven over 3 weeks',
      'Naturally hypoallergenic and insulating',
      'Dyed with locally gathered plant and insect dyes'
    ],
    dimensions: '60" W x 80" L',
    material: 'Baby Alpaca Wool',
    care: 'Dry clean only. For light refreshing, shake out gently and hang in fresh air for 15 minutes.'
  },
  {
    id: 'prod-6',
    title: 'Organic Raw Linen Table Runner',
    category: 'Textiles',
    artisan: 'Astrid Lind',
    origin: 'Gotland, Sweden',
    price: 78.00,
    rating: 4.6,
    reviewsCount: 15,
    image: 'https://i.etsystatic.com/59676068/r/il/cda8a3/7365746075/il_1140xN.7365746075_spsr.jpg',
    stock: 15,
    description: 'A celebration of Nordic minimalism. This heavy-weight table runner is woven with raw, unbleached linen yarns. It retains its natural flax color, presenting a warm, golden-grey hue and a crisp, structured drape that grounds any tabletop styling with natural elegance.',
    details: [
      '100% unbleached raw Nordic flax',
      'Rustic slub-textured weave',
      'Fringe-free, clean mitered corners',
      'Highly absorbent and durable fiber'
    ],
    dimensions: '16" W x 90" L',
    material: 'Raw Flax Linen',
    care: 'Machine wash warm, tumble dry low for a relaxed crumpled look, or iron damp for a crisp, smooth finish.'
  },
  {
    id: 'prod-7',
    title: 'Reclaimed Oak Serving Board',
    category: 'Woodwork',
    artisan: 'Rowan Carver',
    origin: 'Green Mountains, Vermont',
    price: 110.00,
    rating: 4.9,
    reviewsCount: 57,
    image: 'https://buffalowoodturningproducts.com/cdn/shop/products/213998144_1180932742419616_4452099988119556395_n_1024x1024@2x.jpg?v=1626293981',
    stock: 8,
    description: 'Crafted from solid reclaimed white oak salvaged from historic barns, this sturdy board highlights the timber\'s centuries-old grain, mineral streaks, and nail markings. Features a hand-carved offset handle and a chamfered underside edge for effortless lifting.',
    details: [
      'Centuries-old salvaged Vermont white oak',
      'Finished with food-grade pure walnut oil and beeswax',
      'Solid single-piece slab construction',
      'Ideal for charcuterie, bread, or cheese serving'
    ],
    dimensions: '22" L x 9" W x 1" Thick',
    material: 'Reclaimed White Oak Wood',
    care: 'Hand wash with lukewarm water and mild soap. Never soak or put in dishwasher. Apply food-safe mineral oil once a month.'
  },
  {
    id: 'prod-8',
    title: 'Hand-Carved Walnut Spoon Set',
    category: 'Woodwork',
    artisan: 'Jaxon Vance',
    origin: 'Willamette Valley, Oregon',
    price: 65.00,
    rating: 4.8,
    reviewsCount: 22,
    image: 'https://jadcreations.net/cdn/shop/files/A5F57FD8-80B9-4089-86BF-BE56C2E096CD_1_105_c.jpg?v=1734678200',
    stock: 0,
    description: 'A set of three matching utility spoons, individually carved from local black walnut wood using traditional hand axes and chisels. The tactile, faceted knife-marks are left visible on the handles, providing an incredibly comfortable, non-slip grip and an organic handmade feel.',
    details: [
      'Responsibly harvested local Oregon Black Walnut',
      'Includes 1 cooking spoon, 1 tasting spoon, and 1 scoop',
      'Faceted, artisan knife-cut texture',
      'No chemical varnishes or synthetics'
    ],
    dimensions: 'Varying lengths: 8" to 11.5"',
    material: 'Black Walnut Wood',
    care: 'Wash by hand immediately after use. Air dry thoroughly. Re-oil periodically when the wood looks dry or dull.'
  },
  {
    id: 'prod-9',
    title: 'Live Edge Maple Fruit Bowl',
    category: 'Woodwork',
    artisan: 'Elena Rostova',
    origin: 'Kyiv Suburbs, Ukraine',
    price: 195.00,
    rating: 5.0,
    reviewsCount: 11,
    image: 'https://myamericancrafts.com/cdn/shop/products/91346580_2861360230622720_5804585615496314880_o_1024x1024@2x.jpg?v=1585520608',
    stock: 3,
    description: 'Turned on a lathe from a single green maple burl, this statement bowl preserves the rich, knobby live bark edge on its rim. The interior is polished to a glass-smooth finish to showcase the breathtaking, swirling burl eyes, flame figures, and dramatic contrast of wood grains.',
    details: [
      'Single slab of sustainably harvested Maple Burl',
      'Intact natural live bark rim',
      'Sealed with non-toxic, hypoallergenic food-safe finish',
      'Signed and numbered by the artisan on the base'
    ],
    dimensions: '11" Diameter x 5.5" H',
    material: 'Maple Wood Burl & Natural Bark',
    care: 'Clean with a lightly damp microfiber cloth. Do not expose to moisture on the bark edge.'
  }
];

export const categories = ['Ceramics', 'Textiles', 'Woodwork'] as const;

export const artisanOrigins = Array.from(new Set(products.map(p => p.origin)));
