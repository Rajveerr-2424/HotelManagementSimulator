import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const results = await request.json()

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Hotel Management Simulation Report</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #ffffff;
          }
          .container { max-width: 900px; margin: 0 auto; padding: 40px; }
          .header { 
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 { 
            font-size: 32px;
            color: #1e40af;
            margin-bottom: 5px;
          }
          .header p { 
            color: #6b7280;
            font-size: 14px;
          }
          .summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 40px;
            page-break-inside: avoid;
          }
          .metric-card {
            background: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .metric-label { 
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .metric-value { 
            font-size: 28px;
            font-weight: bold;
            color: #1e40af;
          }
          .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
          }
          .section h2 {
            font-size: 20px;
            color: #1e40af;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
          }
          .comparison {
            background: #eff6ff;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            border-left: 4px solid #3b82f6;
          }
          .comparison p {
            margin: 8px 0;
            font-size: 14px;
          }
          .comparison strong { color: #1e40af; }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 13px;
          }
          th {
            background: #1e40af;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
          }
          td {
            padding: 10px 12px;
            border-bottom: 1px solid #e5e7eb;
          }
          tr:nth-child(even) { background: #f9fafb; }
          tr:hover { background: #f3f4f6; }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
          }
          @media print {
            body { background: white; }
            .section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hotel Management Simulation Report</h1>
            <p>Algorithm Comparison: Greedy vs Knapsack</p>
          </div>

          <div class="summary">
            <div class="metric-card">
              <div class="metric-label">Greedy Revenue</div>
              <div class="metric-value">$${results.greedy.totalRevenue.toFixed(0)}</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Knapsack Revenue</div>
              <div class="metric-value">$${results.knapsack.totalRevenue.toFixed(0)}</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Best Algorithm</div>
              <div class="metric-value">${results.knapsack.totalRevenue > results.greedy.totalRevenue ? "Knapsack" : "Greedy"}</div>
            </div>
          </div>

          <div class="section">
            <h2>Greedy Algorithm Results</h2>
            <div class="comparison">
              <p><strong>Total Revenue:</strong> $${results.greedy.totalRevenue.toFixed(2)}</p>
              <p><strong>Occupancy Rate:</strong> ${results.greedy.occupancyRate.toFixed(1)}%</p>
              <p><strong>Accepted Guests:</strong> ${results.greedy.acceptedGuests.length} | <strong>Rejected Guests:</strong> ${results.greedy.rejectedGuests.length}</p>
            </div>
            
            <h3 style="font-size: 16px; color: #374151; margin: 20px 0 10px 0;">Accepted Guests</h3>
            <table>
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Duration (days)</th>
                  <th>Rooms</th>
                  <th>Payment</th>
                  <th>Profit Ratio</th>
                </tr>
              </thead>
              <tbody>
                ${results.greedy.acceptedGuests
                  .map(
                    (g: any) => `
                  <tr>
                    <td>${g.name}</td>
                    <td>${g.duration}</td>
                    <td>${g.roomsRequested}</td>
                    <td>$${g.payment.toFixed(2)}</td>
                    <td>${g.profitRatio.toFixed(2)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>Knapsack Algorithm Results</h2>
            <div class="comparison">
              <p><strong>Total Revenue:</strong> $${results.knapsack.totalRevenue.toFixed(2)}</p>
              <p><strong>Occupancy Rate:</strong> ${results.knapsack.occupancyRate.toFixed(1)}%</p>
              <p><strong>Accepted Guests:</strong> ${results.knapsack.acceptedGuests.length} | <strong>Rejected Guests:</strong> ${results.knapsack.rejectedGuests.length}</p>
            </div>
            
            <h3 style="font-size: 16px; color: #374151; margin: 20px 0 10px 0;">Accepted Guests</h3>
            <table>
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Duration (days)</th>
                  <th>Rooms</th>
                  <th>Payment</th>
                  <th>Profit Ratio</th>
                </tr>
              </thead>
              <tbody>
                ${results.knapsack.acceptedGuests
                  .map(
                    (g: any) => `
                  <tr>
                    <td>${g.name}</td>
                    <td>${g.duration}</td>
                    <td>${g.roomsRequested}</td>
                    <td>$${g.payment.toFixed(2)}</td>
                    <td>${g.profitRatio.toFixed(2)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p>Hotel Management Simulator - Algorithm Comparison Tool</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Convert HTML to PDF using a simple approach - return as HTML that can be printed to PDF
    const pdfBuffer = Buffer.from(htmlContent, "utf-8")
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": 'inline; filename="hotel-simulation-report.html"',
      },
    })
  } catch (error) {
    console.error("PDF export error:", error)
    return NextResponse.json({ error: "PDF export failed" }, { status: 500 })
  }
}
