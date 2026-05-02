# Virtual Tour 3D Web App

A web-based interactive 3D virtual tour system built with **Node.js, Express, and A-Frame (WebXR/WebGL)**.  
It enables multi-floor navigation, 360° hotspots, and smooth camera transitions in a 3D environment.

---

## 🚀 Features

- 🏠 3D dollhouse visualization
- 📍 Interactive teleport hotspots
- 🎥 Smooth camera transitions
- 🌐 360° panoramic environments
- 🧭 Dual camera modes (perspective / hotspot)
- 🎨 Custom GLSL shader for texture blending

---

## 🎨 Custom Shader: `mix-shader`

This project uses a custom A-Frame GLSL shader to support:

- 🔄 Smooth crossfade between two textures
- 🌐 Hybrid UV system (mesh UV + spherical projection)
- 📍 World-space–anchored 360° panoramas
- 🎥 Hotspot-driven scene transitions

---

## ⚙️ Shader Uniforms

| Uniform | Type | Description |
|--------|------|-------------|
| `u_map1` | texture | Base panorama |
| `u_map2` | texture | Target panorama |
| `u_factor` | float (0–1) | Blend factor |
| `u_uv1` | int | UV mode for map1 (0 = spherical, 1 = mesh UV) |
| `u_uv2` | int | UV mode for map2 |
| `u_map1_origin` | vec3 | Origin for spherical projection |
| `u_map2_origin` | vec3 | Origin for spherical projection |

---

## 🌍 UV Modes

### Mesh UV
```glsl
u_uv1 = 1;
u_uv2 = 1;```

Standard model UV mapping (used for dollhouse geometry).

Spherical Projection (360°)
```u_uv1 = 0;
u_uv2 = 0;```

Converts world position into equirectangular UVs based on hotspot origin.

### 🔄 Texture Blending

Core transition logic:

```vec3 color =
  mix(
    textureLod(u_map1, uv1, 0.0).xyz,
    textureLod(u_map2, uv2, 0.0).xyz,
    u_factor
  );```
Behavior:
0.0 → only map1
1.0 → only map2
in-between → smooth crossfade
📍 Hotspot System

Each hotspot defines a world-space origin:

```u_map1_origin
u_map2_origin```

Used to:

Anchor 360° projection
Maintain spatial consistency between views
Enable seamless room transitions
### 🌐 Spherical Projection

Transforms fragment position into panorama UVs:

Computes direction from origin
Converts to longitude/latitude
Produces equirectangular coordinates

Result: correct alignment of 360° images in 3D space.

### 🎬 Interaction Flow

When a hotspot is clicked:

Current texture → u_map1
Target panorama → u_map2
Update origin position
Animate u_factor → 1

This creates a smooth transition between viewpoints.

### 🚀 Purpose of the Shader

Standard A-Frame materials cannot:

Blend multiple panoramic projections
Anchor 360° images in world space
Transition between UV systems dynamically

This shader enables a hybrid virtual tour system combining:

3D geometry (dollhouse)
360° panoramas
Smooth spatial transitions

### 🧩 Summary

A custom rendering system that:

Combines mesh + spherical rendering
Enables seamless hotspot navigation
Drives all visual transitions in the virtual tour

---

If you want next step, I can:
- turn this into a **GitHub-ready project page with badges + screenshots section**
- or help you add a **shader diagram (very useful for portfolios)**
- or simplify it further into a **portfolio case study format (1-page style)**

### 👤 Author

Created by Pedro Firmino
Technical Artist