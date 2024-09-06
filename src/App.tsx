import FixedLayer from "common/components/layer/FixedLayer";
import PageLayout from "common/components/layout/PageLayout";
import AppPageLoader from "common/components/middleware/AppPageLoader";
import { ClientRouteKey } from "common/constants/keys";
import useGlobalStore from "common/contexts/StoreContext";
import { validateLocalToken } from "core/auth";
import { config } from "core/config";
import routes from "core/routes";
import DebugPanel from "debug/components/DebugPanel";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-loading";
import { ReactFlowProvider } from "reactflow";

function App() {
	const navigate = useNavigate();

	const { setUserData } = useGlobalStore();
	// const storeValue = useState({ ...INITIAL_STATE });
	const { status } = useQuery("init", initData, {
		staleTime: Infinity,
		onSuccess: (data) => {
			if (data) {
				setUserData(data.userData);
				if (window.location.pathname !== ClientRouteKey.Home) {
					navigate(ClientRouteKey.Home, { replace: true });
				}
			}
		},
	});

	async function initData() {
		const [data] = await Promise.all([validateLocalToken()]);

		return data;
	}

	function handleError(err: Error) {
		console.error(err);
	}

	return (
		<>
			<Toaster />
			<FixedLayer>
				<DebugPanel isDisplayed={!config.isProductionMode} routes={routes} />
				<AppPageLoader isLoading={status === "loading"} />
			</FixedLayer>
			<ReactFlowProvider>
				{status === "loading" ? null : status === "success" ? (
					<Routes>
						{routes.map(({ path, component: Component, loading = false }) => (
							<Route
								key={path}
								path={path}
								element={
									<ErrorBoundary
										fallback={
											<div>Something went wrong. Please refresh the page.</div>
										}
										onError={handleError}
									>
										<PageLayout>
											<Component />
										</PageLayout>
									</ErrorBoundary>
								}
								loading={loading}
							/>
						))}
					</Routes>
				) : (
					<Navigate to={ClientRouteKey.Login} replace={true} />
				)}
			</ReactFlowProvider>
		</>
	);
}

export default App;
