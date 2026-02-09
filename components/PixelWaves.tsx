'use client'

import { useEffect, useRef } from 'react'

const PX = 2
const GRID = 28
const CANVAS = GRID * PX // 56px
const TEX_W = 56

// Helper: build a 56-col row from [start, end, value?] ranges
// value defaults to 1 (land); use 2 for ice
function r(ranges: [number, number, number?][]): number[] {
  const row = new Array(TEX_W).fill(0)
  for (const [s, e, v = 1] of ranges) {
    for (let i = s; i <= e; i++) row[i] = v
  }
  return row
}

// Earth texture: 28 rows × 56 cols (full 360° wrap)
// 0 = ocean, 1 = land, 2 = ice
// Cols: 0 = 180°W (Date Line), 14 = 90°W, 28 = 0° (Greenwich), 42 = 90°E
// Rows: 0 = North Pole, 14 = Equator, 27 = South Pole
const EARTH = [
  r([[10,12,2],[18,20,2],[39,42,2]]),                                         //  0  87°N Arctic ice
  r([[9,13,2],[17,21,2],[37,44,2]]),                                          //  1  81°N Arctic ice
  r([[7,7],[9,13],[18,21,2],[29,29],[37,48]]),                                //  2  74°N Canada, Greenland, Svalbard, Siberia
  r([[5,7],[8,14],[17,22,2],[25,25],[29,31],[33,49]]),                        //  3  68°N Alaska, Canada, Greenland, Iceland, Scand, Russia
  r([[6,7],[9,16],[18,21,2],[25,25],[28,32],[33,49]]),                        //  4  61°N Alaska, Canada, S Greenland, Iceland, N Europe, Russia
  r([[6,7],[9,16],[27,28],[29,32],[33,48]]),                                  //  5  55°N S Alaska, Canada, UK, Europe, Russia
  r([[8,16],[26,30],[31,35],[36,47],[49,49]]),                                //  6  48°N Pacific NW, US/Canada, France, Europe, Asia, Hokkaido
  r([[9,16],[27,28],[29,34],[35,47],[49,50]]),                                //  7  42°N US, Spain, Europe, Middle East, Asia, Japan
  r([[10,16],[27,34],[35,37],[39,47],[49,49]]),                               //  8  35°N S US, N Africa, Middle East, India/China, Japan
  r([[11,13],[15,15],[17,17],[27,34],[35,37],[39,41],[43,47]]),               //  9  29°N Mexico, Florida, Cuba, Sahara, Arabia, India, China
  r([[11,13],[15,15],[27,34],[35,37],[39,42],[43,45]]),                       // 10  22°N Mexico, Caribbean, Sahara, Arabia, India, SE Asia
  r([[12,13],[16,16],[28,30],[34,35],[39,41],[46,46]]),                       // 11  16°N C America, Caribbean, W Africa, Horn, India, Philippines
  r([[13,13],[15,17],[28,31],[33,35],[40,40],[44,44]]),                       // 12  10°N Panama, Venezuela, W/E Africa, S India, Vietnam
  r([[14,15],[17,18],[29,33],[40,40],[44,45],[47,48]]),                       // 13   3°N Colombia, Guyana, Africa, Sri Lanka, Malaysia, Indonesia
  r([[15,19],[30,33],[44,44],[47,48],[50,51]]),                               // 14   3°S Amazon, C Africa, Sumatra, Borneo, New Guinea
  r([[16,20],[31,34],[46,46],[48,48],[50,51]]),                               // 15  10°S Brazil, E Africa, Java, Timor, PNG
  r([[16,21],[33,34],[35,35],[48,51]]),                                       // 16  16°S Brazil, Mozambique, Madagascar, N Australia
  r([[17,20],[32,33],[47,52]]),                                               // 17  22°S Brazil, Namibia/Botswana, Australia
  r([[18,19],[32,33],[48,52]]),                                               // 18  29°S SE Brazil, S Africa, Australia
  r([[17,18],[33,33],[49,51]]),                                               // 19  35°S Argentina, S Africa tip, E Australia
  r([[17,18],[53,53]]),                                                       // 20  42°S Argentina/Chile, New Zealand
  r([[17,17]]),                                                               // 21  48°S Patagonia
  r([[17,17]]),                                                               // 22  55°S Tierra del Fuego
  r([]),                                                                      // 23  61°S Southern Ocean
  r([[16,17,2]]),                                                             // 24  68°S Antarctic Peninsula
  r([[9,20,2],[29,34,2],[39,48,2]]),                                          // 25  74°S Antarctica
  r([[7,22,2],[27,36,2],[38,50,2]]),                                          // 26  81°S Antarctica
  r([[5,23,2],[26,52,2]]),                                                    // 27  87°S Antarctica
]

const OCEAN = '#3b82f6'
const LAND = '#34d399'
const ICE = '#e2e8f0'
const COLORS = [OCEAN, LAND, ICE]

export function PixelWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.round(window.devicePixelRatio || 1)
    canvas.width = CANVAS * dpr
    canvas.height = CANVAS * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)
    ctx.imageSmoothingEnabled = false

    const R = GRID / 2
    const FPS = 12
    const ROT_SPEED = (2 * Math.PI) / (30 * FPS) // full rotation in ~30s
    let rotation = 0
    let lastTime = 0
    let frameId: number

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS, CANVAS)

      for (let py = 0; py < GRID; py++) {
        for (let px = 0; px < GRID; px++) {
          const nx = (px + 0.5 - R) / R
          const ny = (py + 0.5 - R) / R

          if (nx * nx + ny * ny >= 1) continue

          const nz = Math.sqrt(1 - nx * nx - ny * ny)

          // Sphere projection → texture coordinates
          const lat = Math.asin(-ny)
          const lon = rotation + Math.atan2(nx, nz)

          const v = (Math.PI / 2 - lat) / Math.PI
          const u =
            (((lon % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) /
            (2 * Math.PI)

          const texRowIdx = Math.min(GRID - 1, Math.floor(v * GRID))
          const texCol = Math.floor(u * TEX_W) % TEX_W

          ctx.fillStyle = COLORS[EARTH[texRowIdx][texCol]]
          ctx.fillRect(px * PX, py * PX, PX, PX)
        }
      }

      // Sphere shading — only on drawn pixels (source-atop prevents outline)
      ctx.globalCompositeOperation = 'source-atop'
      const grad = ctx.createRadialGradient(20, 18, 0, 28, 28, 28)
      grad.addColorStop(0, 'rgba(255,255,255,0.18)')
      grad.addColorStop(0.3, 'rgba(255,255,255,0.04)')
      grad.addColorStop(0.55, 'rgba(0,0,0,0)')
      grad.addColorStop(0.8, 'rgba(0,0,0,0.12)')
      grad.addColorStop(1, 'rgba(0,0,0,0.35)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, CANVAS, CANVAS)
      ctx.globalCompositeOperation = 'source-over'
    }

    const animate = (time: number) => {
      if (time - lastTime >= 1000 / FPS) {
        rotation += ROT_SPEED
        draw()
        lastTime = time
      }
      frameId = requestAnimationFrame(animate)
    }

    draw()
    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: CANVAS,
        height: CANVAS,
        imageRendering: 'pixelated',
      }}
    />
  )
}
