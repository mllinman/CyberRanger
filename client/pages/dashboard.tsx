import Head from 'next/head'
import Header from '../components/Header'
import RealTimeDashboard from '../components/RealTimeDashboard'
import Footer from '../components/Footer'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>CyberRanger Pro - Live Security Dashboard</title>
        <meta name="description" content="Real-time network security scanning and monitoring dashboard for authorized penetration testing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-slate-900">
        <Header />
        <main>
          <RealTimeDashboard />
        </main>
        <Footer />
      </div>
    </>
  )
}