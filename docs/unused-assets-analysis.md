## Unused Assets Analysis

This document catalogs asset usage under `public/assets` and identifies unused or candidate assets for removal. Be conservative: assets flagged as "potentially unused" require manual review before deletion.

### Asset inventory summary

- Total assets scanned: 169
- Categories:
  - advice/: icons, logos, and illustration PNG/SVG files (≈ 90+)
  - stories/: story background PNGs (≈ 20+)
  - icons/: standalone SVG/PNG icons (≈ 40+)
  - root: a handful of PNG/SVG files

### Used assets (definitive references)

- Advice (from `src/components/dashboard/advice/mockData.ts`):
  - `/assets/advice/b84cad0c5a3abfaa17c4ee4fbc61536ad9c33781.png`
  - `/assets/advice/c5443c9b0d39ee0d86a9a663a17b3f2cc5c05af0.svg`
  - `/assets/advice/5bbd729c4d66ffe9605baf28fedce95010a165cf.svg`
  - `/assets/advice/4295bcc0ff3c5fd0b0b5cfe36d50701084688dc5.png`
  - `/assets/advice/74f7e8baab90184b05499ea80dce96f157e67779.png`
  - `/assets/advice/a81e514928dac622f5cd9e79d6ae0c85e8041eda.svg`
  - `/assets/advice/58b4c95e38b9410447b0d379c29667cb42194242.svg`
  - `/assets/advice/f24b81b9f69b94fda4e5da97e97749387406ae95.png`
  - `/assets/advice/1b05043773971df7e57c1383b3943d78bf6b5aff.png`
  - `/assets/advice/83921c4741ea1c0c421d5b412bf28d8175ca6c61.svg`

- Stories (from `src/components/dashboard/StoriesPanel.tsx`):
  - `/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png`
  - `/assets/stories/cd1a0d93b746871ac856345bbbf8054a55131586.png`
  - `/assets/stories/6db4130db09497160e078c4e5160e605753cdc52.png`
  - `/assets/stories/5738e1bc9a25d52bf21144f9c160f545681e96d7.png`

- Icons mapping (from `src/lib/icons/index.ts` used by `src/components/icons/Icon.tsx` and `SearchBar`):
  - IMAGES.SALUT_ASSISTANT → `/assets/a10745cc0887a7d79c8328cd4679580095658d0a.png`
  - ICON_SVGS:
    - `/assets/icons/78b4aac2c15552b8c0acc3c49dc2805e66dfdcad.svg`
    - `/assets/icons/249a5dbcdbd61303a929f5a7b0ba6f76c269ea6d.svg`
    - `/assets/icons/cdbfaf6779ca116ea64c455e3fba67ccc5fd425f.svg`
    - `/assets/icons/ced74e330ddca8cf8d1b420c665acef342483b60.svg`
    - `/assets/icons/7cef2d29c06091060ec9aba55a777bbf0fa58460.svg`

### Potentially unused assets (no direct references found)

The following are examples of assets under `public/assets/**` not referenced by code in `src/**` based on grep:

- advice/ (examples):
  - `/assets/advice/6db4130db09497160e078c4e5160e605753cdc52.png`
  - `/assets/advice/7c555ac081e621955c2c245891b952413a9a27c3.png`
  - `/assets/advice/23edad0153988d6704197a43ed4d17e51f00e455.png`
  - `/assets/advice/15e389a1b34022c551f5ca4545429dac77833cec.png`
  - `/assets/advice/6a52af15341e353e7e9055a9d17066de903a9405.svg`
  - `/assets/advice/572546a073706184a10a8081f945b6df732957e6.svg`
  - `/assets/advice/efe98099a0aa97c1aa64e286bc82e633cc9aed22.png`
  - `/assets/advice/8ea383e4b49a4d671d15246f821784ae35526f41.svg`
  - `/assets/advice/d8997e2a59098de9d6359ca0f774f5b0ed275f0a.svg`
  - `/assets/advice/02010ce6dd51a40acbeae2580b8a09180140e184.svg`
  - `/assets/advice/d05c2756925696e89bc4378f8a5e7303c7bb3430.svg`
  - `/assets/advice/5becee8b64e742d845f3d3853a20fc8aa217f421.png`
  - `/assets/advice/aa724ec9f2416a0e1f2847af1de83a85de61f1f5.svg`
  - `/assets/advice/acd2ed6e56c55d489232dbfdc9e00ea270081de9.svg`
  - `/assets/advice/cb780ccee24a59c77d057cb2dfb7f1114aa561aa.svg`
  - `/assets/advice/426f415b709ca04c02be6e39645703cd1f950c31.svg`
  - `/assets/advice/00258170e47dc9e5d054e16ba017b0b94cd2aea7.svg`
  - `/assets/advice/fbae453331c88288fc7980465c3833fb391218f5.svg`
  - `/assets/advice/a6dd5216c5ff059aa46169b00ab8c5c4896d592c.svg`
  - `/assets/advice/26ed102e8d8078da56dfa120ab2535fc2e5b2305.svg`
  - `/assets/advice/7ccb97567e1c516c3e4159ee9040fbab240ce441.png`
  - `/assets/advice/bf89cff2fd1e5df285611ebbd924e1db4710dd42.png`
  - `/assets/advice/0c553cd9520a53e50545a9b401a9a15e1b41c252.svg`
  - `/assets/advice/9efa137ded384f10374fdba0136e16a27a6c4fda.svg`
  - `/assets/advice/961110b1289b1644f852c726ba8a2c5452c0cfdb.png`
  - `/assets/advice/86ddaf2deddaf78a548d0dd507752e5b04e2f1a4.png`
  - `/assets/advice/86c21e1aca973777e4360e968b2ea85bf82505ae.png`
  - `/assets/advice/afd37cddd90d3a820a1da804945465bf312bfbf4.png`
  - `/assets/advice/e66c843d59d9a2ab7ed6d34b748d9cb8720b6091.png`
  - `/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png`
  - `/assets/advice/0f1dded4fc71272117178bdedbdee8c22c8fc17f.png`
  - `/assets/advice/a53d97b170e7c310610698a4c2765bcc33bbb159.png`
  - `/assets/advice/cd1a0d93b746871ac856345bbbf8054a55131586.png`
  - `/assets/advice/4029c2e4597ceb1679b7410e475e64608d8f0cad.png`
  - `/assets/advice/a10745cc0887a7d79c8328cd4679580095658d0a.png`

- stories/ (examples beyond the 4 used):
  - `/assets/stories/0f1dded4fc71272117178bdedbdee8c22c8fc17f.png`
  - `/assets/stories/659c344b04dcdb8f53183a09baf461de238e15e2.png`
  - `/assets/stories/86ddaf2deddaf78a548d0dd507752e5b04e2f1a4.png`
  - `/assets/stories/86c21e1aca973777e4360e968b2ea85bf82505ae.png`
  - `/assets/stories/eae313a48883a46e7a2a60ee806e73a8052191be.png`
  - `/assets/stories/bf89cff2fd1e5df285611ebbd924e1db4710dd42.png`
  - `/assets/stories/afd37cddd90d3a820a1da804945465bf312bfbf4.png`
  - `/assets/stories/961110b1289b1644f852c726ba8a2c5452c0cfdb.png`
  - `/assets/stories/e66c843d59d9a2ab7ed6d34b748d9cb8720b6091.png`
  - `/assets/stories/15e389a1b34022c551f5ca4545429dac77833cec.png`
  - `/assets/stories/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png`
  - `/assets/stories/b84cad0c5a3abfaa17c4ee4fbc61536ad9c33781.png`
  - `/assets/stories/542b2a495f449e9f636667e0096ac63e05be85fa.png`
  - `/assets/stories/a53d97b170e7c310610698a4c2765bcc33bbb159.png`
  - `/assets/stories/ab30eb256075f0e735cf60ae0de004384a15c87a.png`
  - `/assets/stories/74f7e8baab90184b05499ea80dce96f157e67779.png`
  - `/assets/stories/4029c2e4597ceb1679b7410e475e64608d8f0cad.png`

- icons/ (examples beyond mapped ICON_SVGS):
  - Many SVGs/PNGs under `/assets/icons/**` are not directly referenced by the Icon system. Manual review required if planning to use direct file-based icons.

Note: Lists are sampled to illustrate; a full list can be generated from the glob inventory minus the Used set.

### Pattern-based/dynamic usage (manual review)

- `Icon` component primarily renders inline SVGs; however, it can fallback to `ICON_SVGS[normalizedName]`. Current normalized names mapped: SEARCH, MENU, BOOKMARK, HOME, WORK. If new icons are added to `ICON_SVGS`, ensure corresponding files exist or prune unused files under `/assets/icons/`.
- No evidence of dynamic `${assetPath}/${name}` patterns in `src/**`.

### Cleanup strategy

1. Preserve all assets listed in Used.
2. Prioritize pruning unused story PNGs beyond the 4 referenced by `StoriesPanel`.
3. For advice assets, keep only those referenced in `mockData.ts` or rendered from props. Most `advice/*` files are unused; batch-remove after review.
4. For `icons/`, keep ICON_SVGS used by `Icon` and remove extras if not planned for future use.
5. Commit removals in batches per category with clear messages. Keep this file updated with removals.

### Next steps (proposed)

- Batch 1 (stories): remove unused `/assets/stories/*` not in the Used set.
- Batch 2 (advice): remove unused `/assets/advice/*` not referenced in `mockData.ts`.
- Batch 3 (icons): remove `/assets/icons/*` not in `ICON_SVGS` and not referenced elsewhere.

Be conservative: if uncertain about future use, defer deletion or move to an archival folder outside `public/`.


