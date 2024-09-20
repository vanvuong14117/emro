package smartsuite.security.authentication;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.common.collect.Maps;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.util.WebUtils;

import com.fasterxml.jackson.core.JsonProcessingException;

import smartsuite.app.common.shared.service.SharedService;
import smartsuite.security.userdetails.UserDetailsProxy;

public class CertificateAuthenticationSuccessHandler extends
		SavedRequestAwareAuthenticationSuccessHandler {
	@Inject
	private SharedService sharedService;

	@Inject
	public AuthenticationPostService authenticationPostService;
	
	/*private RequestCache requestCache = new HttpSessionRequestCache();*/
	private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	
	private String singlePageTargetUrl;
	
    protected final String getSinglePageTargetUrl() {
        return singlePageTargetUrl;
    }

    public void setSinglePageTargetUrl(String targetUrl) {
        this.singlePageTargetUrl = targetUrl;
    }
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws ServletException, IOException, JsonProcessingException{
		
		// 현재 로그인 성공한 user 객체 조회
		Object principal = authentication.getPrincipal();
		UserDetailsProxy proxy = null;
		if (principal instanceof UserDetails) {
			proxy = (UserDetailsProxy)principal;
		}
		
		//로케일 정보 저장
		String locale = request.getParameter("locale");
		if(locale != null){
			WebUtils.setSessionAttribute(request, SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME, StringUtils.parseLocaleString(locale));
		}
		
		// 사용자 역할에 따른 메뉴-기능-URL 역할정보 session 저장
		if(proxy != null){
			proxy.setUserRoles(sharedService.findListMenuFunctionAndUrlByUserRoleList());
			// 사용자 운영조직 정보 저장
			proxy.setUserOperationOrganizationCodes(sharedService.findListOperationOrganizationByUser(null));
		}
		
		Map<String, Object> loginInfo = Maps.newHashMap();
		loginInfo.put("log_id", UUID.randomUUID().toString());
		loginInfo.put("usr_typ_ccd", (String)Auth.getCurrentUserInfo().get("usr_typ_ccd"));
		loginInfo.put("login_ip", request.getRemoteAddr());
		sharedService.insertLoginLogInfo(loginInfo);

		authenticationPostService.authenticationSuccess(request, response, authentication);

		super.onAuthenticationSuccess(request, response, authentication);
	}
	
	protected void handle(HttpServletRequest request, 
		      HttpServletResponse response, Authentication authentication)
		      throws IOException {
		  
        String targetUrl = determineTargetUrl(request.getParameter("useSinglePage"));
 
        if (response.isCommitted()) {
            logger.debug(
              "Response has already been committed. Unable to redirect to "
              + targetUrl);
            return;
        }
 
        redirectStrategy.sendRedirect(request, response, targetUrl);
    }
	
	protected String determineTargetUrl(String useSinglePage) {
        if ("true".equals(useSinglePage)) {
            return getSinglePageTargetUrl();
        } else  {
            return getDefaultTargetUrl();
        } 
    }
}