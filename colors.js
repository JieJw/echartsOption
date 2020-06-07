function linearColors(opacity1 = 1, opacity2 = 1) {
  const color = [
    {
      type: 'linear',
      x: 0,
      y: 1,
      x2: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: `rgba(6, 90, 236, ${opacity1})`
        },
        {
          offset: 1,
          color: `rgba(2, 227, 255, ${opacity2})`
        }
      ],
      global: false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: `rgba(255, 33, 59, ${opacity1})`
        },
        {
          offset: 1,
          color: `rgba(255, 138, 114, ${opacity2})`
        }
      ],
      global: false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: `rgba(66, 147, 33, ${opacity1})`
        },
        {
          offset: 1,
          color: `rgba(180, 236, 81, ${opacity2})`
        }
      ],
      global: false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: `rgba(250, 217, 97, ${opacity1})`
        },
        {
          offset: 1,
          color: `rgba(247, 107, 28, ${opacity2})`
        }
      ],
      global: false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: `rgba(48, 35, 174, ${opacity1})`
        },
        {
          offset: 1,
          color: `rgba(200, 109, 215, ${opacity2})`
        }
      ],
      global: false
    }
  ]
  return color
}

export { linearColors }
